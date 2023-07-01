# 快速搭建网站-服务端
## linux 打包
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o goserver main.go
## cors 跨域 对应 middleware/cors
``` go
        origin := c.Request.Header.Get("Origin")
		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id,Appid,DateTime,Sign")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type, New-Token, New-Expires-At")
		c.Header("Access-Control-Allow-Credentials", "true")
```
