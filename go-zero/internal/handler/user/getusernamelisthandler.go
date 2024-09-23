package user

import (
	"net/http"

	"board/internal/logic/user"
	"board/internal/svc"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// user name list
func GetUserNameListHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		l := user.NewGetUserNameListLogic(r.Context(), svcCtx)
		resp, err := l.GetUserNameList()
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
