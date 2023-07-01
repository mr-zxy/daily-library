package initialize

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/website/global"
	"github.com/website/middleware"
)

type Response struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"string"`
}

func Router() *gin.Engine {
	Router := gin.Default()
	website := Router.Group("website")
	website.Use(middleware.Core())
	website.GET("/updateOnline", func(ctx *gin.Context) {
		global.GLOBAL_ONLINE += 1
		ctx.String(http.StatusOK, "操作成功")
	})

	website.GET("/getOnline", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, Response{0, global.GLOBAL_ONLINE, "操作成功"})
	})
	return Router
}
