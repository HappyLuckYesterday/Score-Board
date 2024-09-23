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

type CreateSubscribeLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// create subscribe
func NewCreateSubscribeLogic(ctx context.Context, svcCtx *svc.ServiceContext) *CreateSubscribeLogic {
	return &CreateSubscribeLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *CreateSubscribeLogic) CreateSubscribe(req *types.CreateSubscribeRequest) (resp *types.CreateSubscribeResponse, err error) {
	// todo: add your logic here and delete this line

	userId, _, _, _ := ctxdata.GetUidFromCtx(l.ctx)

	if userId == 0 {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.Unauthorized), "user not found")
	}

	_, err = l.svcCtx.SubscribeModel.Insert(l.ctx, &model.Subscribe{
		UserId:    userId,
		SubjectId: req.SubjectId,
	})
	if err != nil {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.DBError), "insert score error, err:%v", err)
	}

	return &types.CreateSubscribeResponse{}, nil
}
