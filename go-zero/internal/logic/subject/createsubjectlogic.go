package subject

import (
	"context"
	"time"

	"board/common/ctxdata"
	"board/common/xerr"
	"board/internal/svc"
	"board/internal/types"
	"board/model"

	"github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
)

type CreateSubjectLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// create subject
func NewCreateSubjectLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateSubjectLogic {
	return &CreateSubjectLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateSubjectLogic) CreateSubject(req *types.CreateSubjectRequest) (resp *types.CreateSubjectResponse, err error) {
	// todo: add your logic here and delete this line

	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	ID, err := l.svcCtx.SubjectModel.Insert(l.ctx, &model.Subject{
		Name:        req.Name,
		Description: req.Description,
		DueDate:     time.Unix(req.DueDate, 0),
		Score:       req.Score,
		Accept:      "N",
	})
	if err != nil {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.DBError), "insert subject error, err:%v", err)
	}

	lastInsertId, err := ID.LastInsertId()
	if err != nil {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.DBError), "get last insert id error, err:%v", err)
	}

	return &types.CreateSubjectResponse{
		Id: uint64(lastInsertId),
	}, nil
}
