package subject

import (
	"net/http"

	"board/internal/logic/subject"
	"board/internal/svc"
	"board/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

// delete subject
func DeleteSubjectHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.DeleteSubjectRequest
		if err := httpx.Parse(r, &req); err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
			return
		}

		l := subject.NewDeleteSubjectLogic(r.Context(), svcCtx)
		resp, err := l.DeleteSubject(&req)
		if err != nil {
			httpx.ErrorCtx(r.Context(), w, err)
		} else {
			httpx.OkJsonCtx(r.Context(), w, resp)
		}
	}
}
