package group

import (
	"net/http"

	"board/internal/logic/group"
	"board/internal/svc"
	"board/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// get group list
func GetGroupListHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.GroupListRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := group.NewGetGroupListLogic(r.Context(), svcCtx)
		resp, err := l.GetGroupList(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
