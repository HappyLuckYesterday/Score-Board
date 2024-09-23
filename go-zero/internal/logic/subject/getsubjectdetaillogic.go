package subject

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetSubjectDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get subject detail
func NewGetSubjectDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetSubjectDetailLogic {
	return &GetSubjectDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetSubjectDetailLogic) GetSubjectDetail(req *types.SubjectDetailRequest) (resp *types.Subject, err error) {
	// todo: add your logic here and delete this line

	return
}
