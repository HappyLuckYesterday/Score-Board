package group

import (
	"context"

	"board/common/ctxdata"
	"board/common/xerr"
	"board/internal/svc"
	"board/internal/types"

	errorplus "github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
)

type DeleteGroupLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// delete group
func NewDeleteGroupLogic(ctx context.Context, svcCtx *svc.ServiceContext) *DeleteGroupLogic {
	return &DeleteGroupLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *DeleteGroupLogic) DeleteGroup(req *types.DeleteGroupRequest) (resp *types.DeleteGroupResponse, err error) {
	// todo: add your logic here and delete this line
	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	err = l.svcCtx.GroupModel.Delete(l.ctx, req.Id)
	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.DBError), "delete group error, err:%v", err)
	}

	return &types.DeleteGroupResponse{}, nil
}
