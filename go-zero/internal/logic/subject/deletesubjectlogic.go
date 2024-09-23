package subject

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteSubjectLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// delete subject
func NewDeleteSubjectLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteSubjectLogic {
	return &DeleteSubjectLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteSubjectLogic) DeleteSubject(req *types.DeleteSubjectRequest) (resp *types.DeleteSubjectResponse, err error) {
	// todo: add your logic here and delete this line

	return
}
