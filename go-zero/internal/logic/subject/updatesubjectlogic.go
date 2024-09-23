package subject

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type UpdateSubjectLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// update subject
func NewUpdateSubjectLogic(ctx context.Context, svcCtx *svc.ServiceContext) *UpdateSubjectLogic {
	return &UpdateSubjectLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *UpdateSubjectLogic) UpdateSubject(req *types.UpdateSubjectRequest) (resp *types.UpdateSubjectResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
