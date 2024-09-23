package score

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteScoreLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// delete score
func NewDeleteScoreLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteScoreLogic {
	return &DeleteScoreLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteScoreLogic) DeleteScore(req *types.DeleteScoreRequest) (resp *types.DeleteScoreResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
