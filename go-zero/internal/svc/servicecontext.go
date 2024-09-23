package svc

import (
	"board/internal/config"
	"board/model"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

type ServiceContext struct {
	Config         config.Config
	UserModel      model.UserModel
	GroupModel     model.GroupModel
	ScoreModel     model.ScoreModel
	SubjectModel   model.SubjectModel
	SubscribeModel model.SubscribeModel
}

func NewServiceContext(c config.Config) *ServiceContext {
	sqlConnAffiliate := sqlx.NewMysql(c.DB.DataSource)

	return &ServiceContext{
		Config:         c,
		UserModel:      model.NewUserModel(sqlConnAffiliate),
		GroupModel:     model.NewGroupModel(sqlConnAffiliate),
		ScoreModel:     model.NewScoreModel(sqlConnAffiliate),
		SubjectModel:   model.NewSubjectModel(sqlConnAffiliate),
		SubscribeModel: model.NewSubscribeModel(sqlConnAffiliate),
	}
}
