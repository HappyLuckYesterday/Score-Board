package middlewares

import (
	"fmt"
	"net/http"
)

type CorsMiddleware struct{}

func NewCorsMiddleware() *CorsMiddleware {
	return &CorsMiddleware{}
}

func (m *CorsMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("cors middleware")
		// Set the CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*") // You can set it to a specific origin instead of "*"
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// If it's an OPTIONS request, respond with 200 OK and return
		if r.Method == http.MethodOptions {
			fmt.Println("OPTIONS")
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler in the chain
		next(w, r)
	}
}
