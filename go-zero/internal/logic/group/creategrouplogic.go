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

type CreateGroupLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// create group
func NewCreateGroupLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateGroupLogic {
	return &CreateGroupLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateGroupLogic) CreateGroup(req *types.CreateGroupRequest) (resp *types.CreateGroupResponse, err error) {
	// todo: add your logic here and delete this line
	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	ID, err := l.svcCtx.GroupModel.Insert(l.ctx, &model.Group{
		Name: req.Name,
	})
	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.DBError), "insert group error, err:%v", err)
	}

	lastInsertId, err := ID.LastInsertId()
	if err != nil {
		return nil, errorplus.Wrapf(xerr.NewErrCode(xerr.DBError), "get last insert id error, err:%v", err)
	}

	return &types.CreateGroupResponse{
		Id: uint64(lastInsertId),
	}, nil
}
