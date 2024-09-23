package user

import (
	"context"
	"errors"

	"board/common/tool"
	"board/common/xerr"
	"board/internal/svc"
	"board/internal/types"
	"board/model"

	errorplus "github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
)

type LoginLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// login
func NewLoginLogic(ctx context.Context, svcCtx *svc.ServiceContext) *LoginLogic {
	return &LoginLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *LoginLogic) Login(req *types.LoginRequest) (resp *types.LoginResponse, err error) {
	// todo: add your logic here and delete this line
	user, err := l.svcCtx.UserModel.FindOneByEmail(l.ctx, req.Email)

	if errors.Is(err, model.ErrNotFound) {
		return nil, errorplus.Wrapf(xerr.NewErrMsg("Invalid Email "), "user not found")
	}
	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.DBError), "find user error: %v", err)
	}

	// check active status
	if user.ActiveFlag != "Y" {
		return nil, errorplus.Wrapf(xerr.NewErrMsg("User is not active"), "user not active")
	}

	// check password
	if user.Password != tool.Md5ByBytes([]byte(req.Password)) {
		return nil, errorplus.Wrapf(xerr.NewErrMsg("Invalid Password"), "password not match")
	}

	// generate token
	generateTokenLogic := NewGenerateTokenLogic(l.ctx, l.svcCtx)

	tokenResp, err := generateTokenLogic.GenerateToken(&GenerateTokenReq{
		UserId:   user.UserId,
		Name:     user.Name,
		NickName: user.NickName,
		GroupId:  user.GroupId,
		UserType: user.Type,
	})
	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.TokenGenerateError), "generateTokenLogic.GenerateToken err:%v", err)
	}

	return &types.LoginResponse{
		AccessToken: tokenResp.AccessToken,
	}, nil
}
