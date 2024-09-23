package subject

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

type GetSubjectListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get subject list
func NewGetSubjectListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetSubjectListLogic {
	return &GetSubjectListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetSubjectListLogic) GetSubjectList(req *types.SubjectListRequest) (resp *types.SubjectListResponse, err error) {
	// todo: add your logic here and delete this line

	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	scores, err := l.svcCtx.SubjectModel.ListSubject(l.ctx, &model.SubjectListFilter{}, req.PageNum, req.PageSize)
	if err != nil {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.DBError), "list subject error: %v", err)
	}

	count := len(scores)
	if count == 0 {
		return &types.SubjectListResponse{
			Total:   int64(0),
			PageNum: req.PageNum,
			List:    nil,
		}, nil
	}
	var list []*types.Subject
	for _, score := range scores {
		list = append(list, &types.Subject{
			Id:          score.Id,
			Name:        score.Name,
			Description: score.Description,
			Score:       score.Score,
			DueDate:     score.DueDate.Unix(),
		})
	}

	return &types.SubjectListResponse{
		Total:   int64(count),
		PageNum: req.PageNum,
		List:    list,
	}, nil
}
