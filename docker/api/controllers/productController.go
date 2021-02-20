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
}

func GetProducts(c *fiber.Ctx) error {
	db := database.Conn()

	var products []Product
	db.Find(&products)

	return c.JSON(products)

}

func CreateProduct(c *fiber.Ctx) error {
	db := database.Conn()

	var product = new(Product)
	if err := c.BodyParser(product); err != nil {
		return err
	}
	db.Create(&product)

	return c.JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	db := database.Conn()
	idParam := c.Params("id")
	var product = new(Product)
	var req = new(Product)

	err := db.First(&product, idParam).Error

	if err != nil {
		return c.SendString("Erro")
	}

	if err := c.BodyParser(req); err != nil {
		return err
	}

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

	db.Save(&product)

	return c.JSON(product)
}
