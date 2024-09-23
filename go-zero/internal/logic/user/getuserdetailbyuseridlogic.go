package user

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetUserDetailByUserIdLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get user detail
func NewGetUserDetailByUserIdLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetUserDetailByUserIdLogic {
	return &GetUserDetailByUserIdLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetUserDetailByUserIdLogic) GetUserDetailByUserId() (resp *types.UserDetailResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
