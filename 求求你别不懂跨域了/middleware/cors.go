package middleware

import (
	"github.com/gin-gonic/gin"
)

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := c.Request.Header.Get("origin")
		method := c.Request.Method
		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Headers", "Content-Type,Token")
		c.Header("Access-Control-Request-Headers", "Content-Type,Token")
		c.Header("Access-Control-Request-Method", method)
		c.Header("Access-Control-Allow-Methods", "OPTIONS,DELETE,PUT,GET,POST")
		c.Header("Access-Control-Expose-Headers", "date,content-type")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Max-Age", "600")
		if method == "OPTIONS" {
			c.AbortWithStatus(200)
		}
		c.Next()
	}
}
