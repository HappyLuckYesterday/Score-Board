package user

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetUserNameListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// user name list
func NewGetUserNameListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetUserNameListLogic {
	return &GetUserNameListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetUserNameListLogic) GetUserNameList() (resp *types.UserName, err error) {
	// todo: add your logic here and delete this line

	return
}
