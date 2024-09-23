package score

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetScoreDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get score detail
func NewGetScoreDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetScoreDetailLogic {
	return &GetScoreDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetScoreDetailLogic) GetScoreDetail(req *types.ScoreDetailRequest) (resp *types.Score, err error) {
	// todo: add your logic here and delete this line

	return
}
