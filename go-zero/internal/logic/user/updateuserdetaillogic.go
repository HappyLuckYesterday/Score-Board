package user

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateUserDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// update user detail
func NewUpdateUserDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateUserDetailLogic {
	return &UpdateUserDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateUserDetailLogic) UpdateUserDetail(req *types.UpdateUserDetailRequest) (resp *types.UpdateUserDetailResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
