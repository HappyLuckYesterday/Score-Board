package group

import (
	"context"

	"board/internal/svc"
	"board/internal/types"

	"github.com/zeromicro/go-zero/core/logx"
)

type GetGroupDetailLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get group detail
func NewGetGroupDetailLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetGroupDetailLogic {
	return &GetGroupDetailLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetGroupDetailLogic) GetGroupDetail(req *types.GroupDetailRequest) (resp *types.Group, err error) {
	// todo: add your logic here and delete this line
	group, err := l.svcCtx.GroupModel.FindOne(l.ctx, req.Id)
	if err != nil {
		return nil, err
	}
	return &types.Group{
		Id:   group.Id,
		Name: group.Name,
	}, nil
}
