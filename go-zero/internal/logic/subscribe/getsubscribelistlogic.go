package subscribe

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

type GetSubscribeListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get subscribe list
func NewGetSubscribeListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetSubscribeListLogic {
	return &GetSubscribeListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetSubscribeListLogic) GetSubscribeList(req *types.SubscribeListRequest) (resp *types.SubscribeListResponse, err error) {
	// todo: add your logic here and delete this line

	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	scores, err := l.svcCtx.SubscribeModel.ListSubscribe(l.ctx, &model.SubscribeListFilter{}, req.PageNum, req.PageSize)
	if err != nil {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.DBError), "list subscribe error: %v", err)
	}

	count := len(scores)
	if count == 0 {
		return &types.SubscribeListResponse{
			Total:   int64(0),
			PageNum: req.PageNum,
			List:    nil,
		}, nil
	}
	var list []*types.Subscribe
	for _, score := range scores {
		list = append(list, &types.Subscribe{
			Id:        score.Id,
			UserId:    score.UserId,
			SubjectId: score.SubjectId,
		})
	}

	return &types.SubscribeListResponse{
		Total:   int64(count),
		PageNum: req.PageNum,
		List:    list,
	}, nil
}
