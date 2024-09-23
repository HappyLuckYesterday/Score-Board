package model

import (
	"context"
	"fmt"
	"strings"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ SubscribeModel = (*customSubscribeModel)(nil)

type (
	SubscribeListFilter struct {
		UserId    uint64
		SubjectId uint64
	}
)
type (
	// SubscribeModel is an interface to be customized, add more methods here,
	// and implement the added methods in customSubscribeModel.
	SubscribeModel interface {
		subscribeModel
		DeleteByIds(ctx context.Context, ids []int64) error
		ListSubscribe(ctx context.Context, filter *SubscribeListFilter, pageNum, pageSize int64) ([]*Subscribe, error)
		withSession(session sqlx.Session) SubscribeModel
	}

	customSubscribeModel struct {
		*defaultSubscribeModel
	}
)

func (c customSubscribeModel) DeleteByIds(ctx context.Context, ids []int64) error {
	placeHolders := make([]string, 0, len(ids))
	for range ids {
		placeHolders = append(placeHolders, "?")
	}
	args := make([]interface{}, 0, len(ids))
	for _, id := range ids {
		args = append(args, id)
	}

	query := fmt.Sprintf("DELETE FROM %s WHERE id IN (%s)", c.table, strings.Join(placeHolders, ","))
	_, err := c.conn.ExecCtx(ctx, query, args...)
	return err
}

func (c customSubscribeModel) ListSubscribe(ctx context.Context, filter *SubscribeListFilter, page, pageSize int64) ([]*Subscribe, error) {
	query := fmt.Sprintf("SELECT * FROM %s WHERE 1=1", c.table)
	if filter.UserId != 0 {
		query += fmt.Sprintf(" AND user_id LIKE '%d'", filter.UserId)
	}
	if filter.SubjectId != 0 {
		query += fmt.Sprintf(" AND subject_id LIKE '%d'", filter.SubjectId)
	}
	query += fmt.Sprintf(" LIMIT %d, %d", (page-1)*pageSize, pageSize)

	var resp []*Subscribe
	err := c.conn.QueryRowsCtx(ctx, &resp, query)
	switch {
	case err == nil:
		return resp, nil
	default:
		return nil, err
	}
}

// NewSubscribeModel returns a model for the database table.
func NewSubscribeModel(conn sqlx.SqlConn) SubscribeModel {
	return &customSubscribeModel{
		defaultSubscribeModel: newSubscribeModel(conn),
	}
}

func (m *customSubscribeModel) withSession(session sqlx.Session) SubscribeModel {
	return NewSubscribeModel(sqlx.NewSqlConnFromSession(session))
}
