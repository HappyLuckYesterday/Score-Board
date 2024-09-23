package subscribe

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetSubscribeDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get subscribe detail
func NewGetSubscribeDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetSubscribeDetailLogic {
	return &GetSubscribeDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetSubscribeDetailLogic) GetSubscribeDetail(req *types.SubscribeDetailRequest) (resp *types.Subscribe, err error) {
	// todo: add your logic here and delete this line

	return
}
