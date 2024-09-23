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

type GetScoreListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get score list
func NewGetScoreListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetScoreListLogic {
	return &GetScoreListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetScoreListLogic) GetScoreList(req *types.ScoreListRequest) (resp *types.ScoreListResponse, err error) {
	// todo: add your logic here and delete this line

	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	scores, err := l.svcCtx.ScoreModel.ListScore(l.ctx, &model.ScoreListFilter{}, req.PageNum, req.PageSize)
	if err != nil {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.DBError), "list score error: %v", err)
	}

	count := len(scores)
	if count == 0 {
		return &types.ScoreListResponse{
			Total:   int64(0),
			PageNum: req.PageNum,
			List:    nil,
		}, nil
	}
	var list []*types.Score
	for _, score := range scores {
		list = append(list, &types.Score{
			Id:      score.Id,
			UserId:  score.UserId,
			GroupId: score.GroupId,
		})
	}

	return &types.ScoreListResponse{
		Total:   int64(count),
		PageNum: req.PageNum,
		List:    list,
	}, nil
}
