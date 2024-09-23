package score

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateScoreLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// update score
func NewUpdateScoreLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateScoreLogic {
	return &UpdateScoreLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateScoreLogic) UpdateScore(req *types.UpdateScoreRequest) (resp *types.UpdateScoreResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
