package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Conn() *gorm.DB {
	dsn := "root:root@tcp(mysql-container)/avaliacao?charset=utf8mb4&parseTime=True"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("Conexão Falhou")
	} else {
		fmt.Println("Conexão Sucedida")
	}

	return db

}
