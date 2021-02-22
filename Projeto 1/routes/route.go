package routes

import (
	"projeto/controllers"

	"github.com/gofiber/fiber/v2"
)

func Routes(route fiber.Router) {
	route.Get("/", controllers.GetProducts)
	route.Post("/createProduct", controllers.CreateProduct)
	route.Put("/updateProduct/:id", controllers.UpdateProduct)
} // Método de redirecionamento para as páginas de acordo com o link
