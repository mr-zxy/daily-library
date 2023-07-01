package core

import (
	"github.com/website/initialize"
)

func RunServer() {
	router := initialize.Router()
	router.Run(":8080")
}
