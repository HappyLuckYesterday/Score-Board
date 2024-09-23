package middlewares

import (
	"fmt"
	"net/http"

	"github.com/zeromicro/go-zero/rest/handler"
)

type CommonJwtAuthMiddleware struct {
	secret string
}

func NewCommonJwtAuthMiddleware(secret string) *CommonJwtAuthMiddleware {
	return &CommonJwtAuthMiddleware{secret: secret}
}

func (m *CommonJwtAuthMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("jwt auth middleware")
		if len(r.Header.Get("Authorization")) == 0 {
			next(w, r)
		} else {
			authHandle := handler.Authorize(m.secret)
			authHandle(next).ServeHTTP(w, r)
		}
	}
}
