package main

import (
	"projeto/database"
	"projeto/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	database.Conn()
	routes.Routes(app)

	app.Listen(":8000")

}
