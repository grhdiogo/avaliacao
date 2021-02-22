package controllers

import (
	"projeto/database"

	"github.com/gofiber/fiber/v2"
)

type Product struct {
	ID          int `gorm:"primarykey"`
	Name        *string
	Description *string
	Price       *float64
	Stock       *int
} // Criação da estrutura de produto

func GetProducts(c *fiber.Ctx) error {
	db := database.Conn() // crio uma variável e chamo o método Conn do projeto database para recuperar a conexão ao banco ed dados

	var products []Product
	db.Find(&products)

	return c.JSON(products)

} // Criou uma variável do tipo array de Product e utilizo o um método do Gorm "Find" para recuperar os dados do tipo produto do banco de dados e retorno como um json

func CreateProduct(c *fiber.Ctx) error {
	db := database.Conn()

	var product = new(Product)
	if err := c.BodyParser(product); err != nil {
		return err
	} //Faço a transformação do dados q recebo por http em uma variável do tipo produto, e crio um novo registro no banco de dados
	db.Create(&product)

	return c.JSON(product) //retorno o produto criado para fins de validação
}

func UpdateProduct(c *fiber.Ctx) error {
	db := database.Conn()
	idParam := c.Params("id") // recebo uma variável id pelo parametro
	var product = new(Product)
	var req = new(Product)

	err := db.First(&product, idParam).Error // Verifico se existe algum produto com esse id no banco de dados

	if err != nil {
		return c.SendString("Erro")
	} //caso não existe, retorno um erro

	if err := c.BodyParser(req); err != nil {
		return err
	} //Recebo os parametros da requisição e atribuo a uma variável

	if req.Description != nil {
		product.Description = req.Description
	}
	if req.Name != nil {
		product.Name = req.Name
	}
	if req.Price != nil {
		product.Price = req.Price
	}
	if req.Stock != nil {
		product.Stock = req.Stock
	}
	//Verifico quais das informações foram enviadas para serem modificadas e quais não foram continuam a mesma

	db.Save(&product) // Atualizo o produto com as informações enviadas

	return c.JSON(product)
}
