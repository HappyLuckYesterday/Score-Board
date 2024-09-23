package model

import (
	"context"
	"fmt"
	"strings"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ GroupModel = (*customGroupModel)(nil)

type GroupListFilter struct {
	Name string
}

type (
	// GroupModel is an interface to be customized, add more methods here,
	// and implement the added methods in customGroupModel.
	GroupModel interface {
		groupModel
		DeleteByIds(ctx context.Context, ids []int64) error
		ListGroup(ctx context.Context, filter *GroupListFilter, page, pageSize int64) ([]*Group, error)
		withSession(session sqlx.Session) GroupModel
	}

	customGroupModel struct {
		*defaultGroupModel
	}
)

func (c customGroupModel) DeleteByIds(ctx context.Context, ids []int64) error {
	placeHolders := make([]string, 0, len(ids))
	for range ids {
		placeHolders = append(placeHolders, "?")
	}
	args := make([]interface{}, 0, len(ids))
	for _, id := range ids {
		args = append(args, id)
	}

	query := fmt.Sprintf("DELETE FROM group WHERE id IN (%s)", strings.Join(placeHolders, ","))
	_, err := c.conn.ExecCtx(ctx, query, args...)
	return err
}

func (c customGroupModel) ListGroup(ctx context.Context, filter *GroupListFilter, page, pageSize int64) ([]*Group, error) {
	query := fmt.Sprintf("SELECT * FROM %s WHERE 1=1", c.table)
	if filter.Name != "" {
		query += fmt.Sprintf(" AND name LIKE '%s'", filter.Name)
	}
	query += fmt.Sprintf(" LIMIT %d, %d", (page-1)*pageSize, pageSize)

	var resp []*Group
	err := c.conn.QueryRowsCtx(ctx, &resp, query)
	switch {
	case err == nil:
		return resp, nil
	default:
		return nil, err
	}
}

// NewGroupModel returns a model for the database table.
func NewGroupModel(conn sqlx.SqlConn) GroupModel {
	return &customGroupModel{
		defaultGroupModel: newGroupModel(conn),
	}
}

func (m *customGroupModel) withSession(session sqlx.Session) GroupModel {
	return NewGroupModel(sqlx.NewSqlConnFromSession(session))
}
