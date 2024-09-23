package user

import (
	"context"

	"board/common/ctxdata"
	"board/common/tool"
	"board/common/xerr"
	"board/internal/svc"
	"board/internal/types"
	"board/model"

	errorplus "github.com/pkg/errors"

	"github.com/zeromicro/go-zero/core/logx"
)

type AddUserLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// add user
func NewAddUserLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AddUserLogic {
	return &AddUserLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AddUserLogic) AddUser(req *types.AddUserRequest) (resp *types.AddUserResponse, err error) {
	// todo: add your logic here and delete this line
	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	password := tool.Md5ByBytes([]byte(req.Password))
	_, err = l.svcCtx.UserModel.Insert(l.ctx, &model.User{
		Name:     req.Name,
		NickName: req.NickName,
		Password: password,
		GroupId:  req.GroupId,
	})

	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.DBError), "insert user error: %v", err)
	}

	return &types.AddUserResponse{}, nil
}
