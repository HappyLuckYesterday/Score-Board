package score

import (
	"context"

	"board/common/ctxdata"
	"board/common/xerr"
	"board/internal/svc"
	"board/internal/types"
	"board/model"

	"github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
)

type CreateScoreLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// create score
func NewCreateScoreLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateScoreLogic {
	return &CreateScoreLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateScoreLogic) CreateScore(req *types.CreateScoreRequest) (resp *types.CreateScoreResponse, err error) {
	// todo: add your logic here and delete this line

	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	_, err = l.svcCtx.ScoreModel.Insert(l.ctx, &model.Score{
		UserId:  userId,
		GroupId: req.GroupId,
		Score:   req.Score,
	})
	if err != nil {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.DBError), "insert score error, err:%v", err)
	}

	return &types.CreateScoreResponse{}, nil
}
