package user

import (
	"context"
	"errors"

	"board/common/tool"
	"board/common/uniqueid"
	"board/common/xerr"
	"board/internal/svc"
	"board/internal/types"
	"board/model"

	errorplus "github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
)

type RegisterLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// register
func NewRegisterLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RegisterLogic {
	return &RegisterLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RegisterLogic) Register(req *types.RegisterRequest) (resp *types.RegisterResponse, err error) {
	//check email exists or not
	u, err := l.svcCtx.UserModel.FindOneByEmail(l.ctx, req.Email)
	if err != nil && !errors.Is(err, model.ErrNotFound) {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.DBError), "find user error: %v", err)
	}
	if u != nil {
		return nil, errorplus.Wrapf(xerr.NewErrMsg("Email already exists"), "email already exists")
	}

	userId, err := uniqueid.GetID()
	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.UniqueIDGenerateError), "get userId error: %v", err)
	}

	password := tool.Md5ByBytes([]byte(req.Password))

	_, err = l.svcCtx.UserModel.Insert(l.ctx, &model.User{
		UserId:     userId,
		Name:       req.Name,
		NickName:   req.NickName,
		Email:      req.Email,
		Password:   password,
		GroupId:    req.GroupId,
		Type:       "user",
		ActiveFlag: "N",
	})
	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.DBError), "insert user error: %v", err)
	}
	return &types.RegisterResponse{}, nil
}
