package main

import (
	"fmt"
	"net/http"

	"github.com/axios/middleware"
	"github.com/gin-gonic/gin"
)

type Request struct {
	Id string `json:"id"` // 管理ID
}

func main() {
	router := gin.Default()
	router.Use(middleware.Cors())
	router.Static("static", "./static")
	router.GET("/", func(ctx *gin.Context) {
		fmt.Println("GET接收：" + ctx.Query("id"))
		ctx.String(http.StatusOK, "操作成功")
	})

	router.POST("/", func(ctx *gin.Context) {
		key, _ := ctx.Cookie("key")
		fmt.Println("cookie获取key", key)
		var request Request
		err := ctx.ShouldBindJSON(&request)
		if err != nil {
			return
		}
		fmt.Printf("POST接收：%v", request.Id)
		ctx.String(http.StatusOK, "操作成功")
	})

	router.PUT("/", func(ctx *gin.Context) {
		var request Request
		err := ctx.ShouldBindJSON(&request)
		if err != nil {
			return
		}
		fmt.Printf("PUT接收：%v", request.Id)
		ctx.String(http.StatusOK, "操作成功")
	})

	router.DELETE("/:id", func(ctx *gin.Context) {
		fmt.Println("DELETE接收：" + ctx.Param("id"))
		ctx.String(http.StatusOK, "操作成功")
	})

	router.Run()
}
