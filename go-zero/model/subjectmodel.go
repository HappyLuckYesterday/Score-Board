package model

import (
	"context"
	"fmt"
	"strings"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ SubjectModel = (*customSubjectModel)(nil)

type (
	SubjectListFilter struct {
		Name   string
		Score  int64
		Accept string
	}
)

type (
	// SubjectModel is an interface to be customized, add more methods here,
	// and implement the added methods in customSubjectModel.
	SubjectModel interface {
		subjectModel
		DeleteByIds(ctx context.Context, ids []int64) error
		ListSubject(ctx context.Context, filter *SubjectListFilter, pageNum, pageSize int64) ([]*Subject, error)
		withSession(session sqlx.Session) SubjectModel
	}

	customSubjectModel struct {
		*defaultSubjectModel
	}
)

func (c customSubjectModel) DeleteByIds(ctx context.Context, ids []int64) error {
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

func (c customSubjectModel) ListSubject(ctx context.Context, filter *SubjectListFilter, page, pageSize int64) ([]*Subject, error) {
	query := fmt.Sprintf("SELECT * FROM %s WHERE 1=1", c.table)
	if filter.Name != "" {
		query += fmt.Sprintf(" AND name LIKE '%s'", filter.Name)
	}
	if filter.Accept != "" {
		query += fmt.Sprintf(" AND accept LIKE '%s'", filter.Accept)
	}
	query += fmt.Sprintf(" LIMIT %d, %d", (page-1)*pageSize, pageSize)

	var resp []*Subject
	err := c.conn.QueryRowsCtx(ctx, &resp, query)
	switch {
	case err == nil:
		return resp, nil
	default:
		return nil, err
	}
}

// NewSubjectModel returns a model for the database table.
func NewSubjectModel(conn sqlx.SqlConn) SubjectModel {
	return &customSubjectModel{
		defaultSubjectModel: newSubjectModel(conn),
	}
}

func (m *customSubjectModel) withSession(session sqlx.Session) SubjectModel {
	return NewSubjectModel(sqlx.NewSqlConnFromSession(session))
}
