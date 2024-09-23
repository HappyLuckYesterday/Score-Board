package user

import (
	"net/http"

	"board/internal/logic/user"
	"board/internal/svc"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// get user detail
func GetUserDetailByUserIdHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := user.NewGetUserDetailByUserIdLogic(r.Context(), svcCtx)
		resp, err := l.GetUserDetailByUserId()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
