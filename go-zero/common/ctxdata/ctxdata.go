package ctxdata

import (
	"context"
	"encoding/json"
	"strconv"

	"github.com/zeromicro/go-zero/core/logx"
)

var CtxKeyJwtEmail = "jwtEmail"
var CtxKeyJwtName = "jwtName"
var CtxKeyJwtGroupId = "jwtGroupId"

var CtxKeyJwtUserId = "jwtUserId"
var CtxKeyJwtNickName = "jwtNickName"
var CtxKeyJwtUserType = "jwtUserType"

func GetUidFromCtx(ctx context.Context) (uint64, string, string, string) {
	var (
		uid uint64
		name,
		nickName,
		userType string
	)
	if jsonUid, ok := ctx.Value(CtxKeyJwtUserId).(json.Number); ok {

		if uint64Uid, err := strconv.ParseUint(jsonUid.String(), 10, 64); err == nil {
			uid = uint64Uid
		} else {
			logx.WithContext(ctx).Errorf("GetUidFromCtx err : %+v", err)
		}
	} else {
		logx.WithContext(ctx).Errorf("GetUidFromCtx error: %v", "uid not found in ctx")
	}

	if jsonName, ok := ctx.Value(CtxKeyJwtName).(string); ok {
		name = jsonName
	}
	if jsonNickName, ok := ctx.Value(CtxKeyJwtNickName).(string); ok {
		nickName = jsonNickName
	}
	if jsonUserType, ok := ctx.Value(CtxKeyJwtUserType).(string); ok {
		userType = jsonUserType
	}
	return uid, name, nickName, userType
}
func GetPidFromCtx(ctx context.Context) (int64, string, string) {
	var (
		pid int64
		email,
		name string
	)
	if jsonUid, ok := ctx.Value(CtxKeyJwtGroupId).(json.Number); ok {

		if int64id, err := strconv.ParseInt(jsonUid.String(), 10, 64); err == nil {
			pid = int64id
		} else {
			logx.WithContext(ctx).Errorf("GetUidFromCtx err : %+v", err)
		}
	} else {
		logx.WithContext(ctx).Errorf("GetUidFromCtx error: %v", "uid not found in ctx")
	}

	if jsonEmail, ok := ctx.Value(CtxKeyJwtEmail).(string); ok {
		email = jsonEmail
	}
	if jsonName, ok := ctx.Value(CtxKeyJwtName).(string); ok {
		name = jsonName
	}
	return pid, email, name
}
