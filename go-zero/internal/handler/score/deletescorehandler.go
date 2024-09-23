package score

import (
	"net/http"

	"board/internal/logic/score"
	"board/internal/svc"
	"board/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// delete score
func DeleteScoreHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.DeleteScoreRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := score.NewDeleteScoreLogic(r.Context(), svcCtx)
		resp, err := l.DeleteScore(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
