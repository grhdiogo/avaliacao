package main

import (
	"projeto/database"
	"projeto/routes"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New() // Crio uma variável do tipo fiber para lidar com requisições http
	database.Conn()    // Realizo a coneção com o bando de dados
	routes.Routes(app) // Chamdo o pacote rotas e a função rotas e passo o app

	app.Listen(":8000") // Porta onde a api será executada

}
