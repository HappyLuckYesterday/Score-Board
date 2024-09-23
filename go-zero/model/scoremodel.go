package model

import (
	"context"
	"fmt"
	"strings"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ ScoreModel = (*customScoreModel)(nil)

type (
	ScoreListFilter struct {
		UserId  uint64
		GroupId uint64
	}
)

type (
	// ScoreModel is an interface to be customized, add more methods here,
	// and implement the added methods in customScoreModel.
	ScoreModel interface {
		scoreModel
		DeleteByIds(ctx context.Context, ids []int64) error
		ListScore(ctx context.Context, filter *ScoreListFilter, pageNum, pageSize int64) ([]*Score, error)
		withSession(session sqlx.Session) ScoreModel
	}

	customScoreModel struct {
		*defaultScoreModel
	}
)

func (c customScoreModel) DeleteByIds(ctx context.Context, ids []int64) error {
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

func (c customScoreModel) ListScore(ctx context.Context, filter *ScoreListFilter, page, pageSize int64) ([]*Score, error) {
	query := fmt.Sprintf("SELECT * FROM %s WHERE 1=1", c.table)
	if filter.UserId != 0 {
		query += fmt.Sprintf(" AND user_id LIKE '%d'", filter.UserId)
	}
	if filter.GroupId != 0 {
		query += fmt.Sprintf(" AND group_id LIKE '%d'", filter.GroupId)
	}
	query += fmt.Sprintf(" LIMIT %d, %d", (page-1)*pageSize, pageSize)

	var resp []*Score
	err := c.conn.QueryRowsCtx(ctx, &resp, query)
	switch {
	case err == nil:
		return resp, nil
	default:
		return nil, err
	}
}

// NewScoreModel returns a model for the database table.
func NewScoreModel(conn sqlx.SqlConn) ScoreModel {
	return &customScoreModel{
		defaultScoreModel: newScoreModel(conn),
	}
}

func (m *customScoreModel) withSession(session sqlx.Session) ScoreModel {
	return NewScoreModel(sqlx.NewSqlConnFromSession(session))
}
