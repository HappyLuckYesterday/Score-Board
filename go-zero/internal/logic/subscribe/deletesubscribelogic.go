package subscribe

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteSubscribeLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// delete subscribe
func NewDeleteSubscribeLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteSubscribeLogic {
	return &DeleteSubscribeLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteSubscribeLogic) DeleteSubscribe(req *types.DeleteSubscribeRequest) (resp *types.DeleteSubscribeResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
