package subscribe

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateSubscribeLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// update subscribe
func NewUpdateSubscribeLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateSubscribeLogic {
	return &UpdateSubscribeLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateSubscribeLogic) UpdateSubscribe(req *types.UpdateSubscribeRequest) (resp *types.UpdateSubscribeResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
