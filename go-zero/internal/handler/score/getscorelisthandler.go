package score

import (
	"net/http"

	"board/internal/logic/score"
	"board/internal/svc"
	"board/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// get score list
func GetScoreListHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.ScoreListRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := score.NewGetScoreListLogic(r.Context(), svcCtx)
		resp, err := l.GetScoreList(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
