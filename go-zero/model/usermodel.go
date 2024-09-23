package model

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

var _ UserModel = (*customUserModel)(nil)

type (
	UserListFilter struct {
		Name       string `db:"name"`
		NickName   string `db:"nick_name"`
		Email      string `db:"email"`
		Type       string `db:"type"`
		GroupId    string `db:"group_id"`
		ActiveFlag string `db:"active_flag"`
	}
	UserName struct {
		Name     string `db:"name"`
		NickName string `db:"nick_name"`
		Id       int64  `db:"id"`
	}
)

type (
	// UserModel is an interface to be customized, add more methods here,
	// and implement the added methods in customUserModel.
	UserModel interface {
		userModel
		IsAdmin(cxt context.Context, userId uint64) (bool, error)
		FindOneByUserId(ctx context.Context, userId uint64) (*User, error)
		DeleteByIds(ctx context.Context, ids []int64) error
		ListUser(ctx context.Context, filter *UserListFilter, page, pageSize int64) ([]*User, error)
		ListUserCount(ctx context.Context, filter *UserListFilter) (int64, error)
		ListUserName(ctx context.Context) ([]*UserName, error)
		InsertBatch(ctx context.Context, tx sqlx.Session, data []*User) error
		withSession(session sqlx.Session) UserModel
	}

	customUserModel struct {
		*defaultUserModel
	}
)

func (c customUserModel) InsertBatch(ctx context.Context, tx sqlx.Session, data []*User) error {

	placeHolder := make([]string, 0, len(data))
	args := make([]interface{}, 0, len(data)*8)
	for _, d := range data {
		placeHolder = append(placeHolder, "(?, ?, ?, ?, ?, ?, ?)")
		args = append(args, d.Name, d.NickName, d.Email, d.Password, d.Type, d.GroupId, d.ActiveFlag)
	}
	query := `INSERT INTO user (name, nick_name, email, password, type, group_id, active_flag) VALUES ` + strings.Join(placeHolder, ",")
	if tx != nil {
		_, err := tx.ExecCtx(ctx, query, args...)
		return err
	}
	_, err := c.conn.ExecCtx(ctx, query, args...)
	return err

}

func (c customUserModel) ListUserName(ctx context.Context) ([]*UserName, error) {

	query := `SELECT id, name, nick_name FROM user`

	var resp []*UserName
	err := c.conn.QueryRowCtx(ctx, &resp, query)
	switch {
	case err == nil:
		return resp, nil
	default:
		return nil, err
	}

}

func (c customUserModel) ListUser(ctx context.Context, filter *UserListFilter, page, pageSize int64) ([]*User, error) {
	query := `SELECT ` + userRows + ` FROM user WHERE 1=1 `
	args := make([]interface{}, 0)

	if filter != nil {
		if filter.Email != "" {
			query += fmt.Sprintf(" and email like '%%%s%%'", filter.Email)
		}
		if filter.Name != "" {
			query += fmt.Sprintf(" and name like '%%%s%%'", filter.Name)
		}
		if filter.NickName != "" {
			query += fmt.Sprintf(" and nick_name like '%%%s%%'", filter.NickName)
		}
		if filter.Type != "" {
			query += ` AND type = ? `
			args = append(args, filter.Type)
		}
		if filter.GroupId != "" {
			query += ` AND group_id = ? `
			args = append(args, filter.GroupId)
		}
		if filter.ActiveFlag != "" {
			query += ` AND active_flag = ? `
			args = append(args, filter.ActiveFlag)
		}
	}
	query += ` LIMIT ?, ?`
	args = append(args, (page-1)*pageSize, pageSize)

	var resp []*User
	err := c.conn.QueryRowCtx(ctx, &resp, query, args...)
	switch {
	case err == nil:
		return resp, nil
	default:
		return nil, err
	}

}

func (c customUserModel) ListUserCount(ctx context.Context, filter *UserListFilter) (int64, error) {

	query := `SELECT COUNT(*) FROM user WHERE 1=1 `
	args := make([]interface{}, 0)

	if filter != nil {
		if filter.Email != "" {
			query += fmt.Sprintf(" and email like '%%%s%%'", filter.Email)
		}
		if filter.Name != "" {
			query += fmt.Sprintf(" and name like '%%%s%%'", filter.Name)
		}
		if filter.NickName != "" {
			query += fmt.Sprintf(" and nick_name like '%%%s%%'", filter.NickName)
		}
		if filter.Type != "" {
			query += ` AND type = ? `
			args = append(args, filter.Type)
		}
		if filter.GroupId != "" {
			query += ` AND group_id = ? `
			args = append(args, filter.GroupId)
		}
		if filter.ActiveFlag != "" {
			query += ` AND active_flag = ? `
			args = append(args, filter.ActiveFlag)
		}
	}

	var count int64
	err := c.conn.QueryRowCtx(ctx, &count, query, args...)
	switch {
	case err == nil:
		return count, nil
	default:
		return 0, err
	}
}

func (c customUserModel) DeleteByIds(ctx context.Context, ids []int64) error {
	placeHolders := make([]string, 0, len(ids))
	for range ids {
		placeHolders = append(placeHolders, "?")
	}
	args := make([]interface{}, 0, len(ids))
	for _, id := range ids {
		args = append(args, id)
	}

	query := `DELETE FROM user WHERE id IN (` + strings.Join(placeHolders, ",") + `)`
	_, err := c.conn.ExecCtx(ctx, query, args...)
	return err

}

func (c customUserModel) FindOneByUserId(ctx context.Context, userId uint64) (*User, error) {

	query := `SELECT * FROM user WHERE user_id = ?`

	var user User
	err := c.conn.QueryRowCtx(ctx, &user, query, userId)
	switch {
	case err == nil:
		return &user, nil
	case errors.Is(err, sqlx.ErrNotFound):
		return nil, ErrNotFound
	default:
		return nil, err
	}

}

func (c customUserModel) IsAdmin(ctx context.Context, userId uint64) (bool, error) {

	query := `SELECT type FROM user WHERE user_id = ?`

	var userType string
	err := c.conn.QueryRowCtx(ctx, &userType, query, userId)
	switch err {
	case nil:
		if userType == "admin" {
			return true, nil
		} else {
			return false, nil
		}
	default:
		return false, err
	}

}

// NewUserModel returns a model for the database table.
func NewUserModel(conn sqlx.SqlConn) UserModel {
	return &customUserModel{
		defaultUserModel: newUserModel(conn),
	}
}

func (m *customUserModel) withSession(session sqlx.Session) UserModel {
	return NewUserModel(sqlx.NewSqlConnFromSession(session))
}
