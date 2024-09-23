package main

import (
	"flag"
	"fmt"

	"board/common/middlewares"
	"board/common/uniqueid"
	"board/internal/config"
	"board/internal/handler"
	"board/internal/svc"

	"github.com/zeromicro/go-zero/core/conf"
	"github.com/zeromicro/go-zero/rest"
)

var configFile = flag.String("f", "etc/board.yaml", "the config file")

func main() {
	flag.Parse()

	var c config.Config
	conf.MustLoad(*configFile, &c)

	if err := uniqueid.Init(1); err != nil {
		fmt.Printf("init snowflake failed, err:%v\n", err)
		return
	}

	server := rest.MustNewServer(c.RestConf)
	defer server.Stop()

	server.Use(middlewares.NewCorsMiddleware().Handle)
	server.Use(middlewares.NewCommonJwtAuthMiddleware(c.JwtAuth.AccessSecret).Handle)

	ctx := svc.NewServiceContext(c)
	handler.RegisterHandlers(server, ctx)

	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)
	server.Start()
}
