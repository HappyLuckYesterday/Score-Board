package user

import (
	"board/common/ctxdata"
	"board/common/xerr"
	"board/internal/svc"
	"context"

	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/pkg/errors"
	"github.com/zeromicro/go-zero/core/logx"
)

type GenerateTokenReq struct {
	UserId   uint64
	Name     string
	NickName string
	GroupId  uint64
	UserType string
}

type GenerateTokenResp struct {
	AccessToken  string
	RefreshToken string
}

type GenerateTokenLogic struct {
	ctx    context.Context
	svcCtx *svc.ServiceContext
	logx.Logger
}

func NewGenerateTokenLogic(ctx context.Context, svcCtx *svc.ServiceContext) *GenerateTokenLogic {
	return &GenerateTokenLogic{
		ctx:    ctx,
		svcCtx: svcCtx,
		Logger: logx.WithContext(ctx),
	}
}

func (l *GenerateTokenLogic) GenerateToken(in *GenerateTokenReq) (*GenerateTokenResp, error) {
	now := time.Now().Unix()
	accessExpire := l.svcCtx.Config.JwtAuth.AccessExpire
	accessToken, rToken, err := l.getJwtToken(l.svcCtx.Config.JwtAuth.AccessSecret, now, accessExpire, in.UserId, in.Name, in.NickName, in.UserType)
	if err != nil {
		return nil, errors.Wrapf(xerr.NewErrCode(xerr.TokenGenerateError), "getJwtToken err userId:%d , err:%v", in.UserId, err)
	}

	return &GenerateTokenResp{
		AccessToken:  accessToken,
		RefreshToken: rToken,
	}, nil
}

func (l *GenerateTokenLogic) getJwtToken(secretKey string, iat, seconds int64, userId uint64, name, nickname, userType string) (string, string, error) {
	claims := make(jwt.MapClaims)
	claims["exp"] = iat + seconds
	claims["iat"] = iat
	claims[ctxdata.CtxKeyJwtUserId] = userId
	claims[ctxdata.CtxKeyJwtName] = name
	claims[ctxdata.CtxKeyJwtNickName] = nickname
	claims[ctxdata.CtxKeyJwtUserType] = userType
	token := jwt.New(jwt.SigningMethodHS256)
	token.Claims = claims
	aToken, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", "", err
	}
	rToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:    "Yama",
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 1000)),
	}).SignedString([]byte(secretKey))

	return aToken, rToken, err
}
