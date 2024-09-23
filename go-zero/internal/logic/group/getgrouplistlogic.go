package group

import (
	"context"

	"board/common/ctxdata"
	"board/common/xerr"
	"board/internal/svc"
	"board/internal/types"
	"board/model"

	errorplus "github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
)

type GetGroupListLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// get group list
func NewGetGroupListLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GetGroupListLogic {
	return &GetGroupListLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *GetGroupListLogic) GetGroupList(req *types.GroupListRequest) (resp *types.GroupListResponse, err error) {
	// todo: add your logic here and delete this line

	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	groups, err := l.svcCtx.GroupModel.ListGroup(l.ctx, &model.GroupListFilter{}, req.PageNum, req.PageSize)
	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.DBError), "list group error: %v", err)
	}

	count := len(groups)
	if count == 0 {
		return &types.GroupListResponse{
			Total:   int64(0),
			PageNum: req.PageNum,
			List:    nil,
		}, nil
	}

	var list []*types.Group
	for _, group := range groups {
		list = append(list, &types.Group{
			Id:   group.Id,
			Name: group.Name,
		})
	}

	return &types.GroupListResponse{
		Total:   int64(count),
		PageNum: req.PageNum,
		List:    list,
	}, nil
}
