package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Conn() *gorm.DB {
	dsn := "root:root@tcp(mysql-container)/avaliacao?charset=utf8mb4&parseTime=True" // Variável q contém os dados do banco de dados para abrir conexão user:pass@tcp(host)/tabela
	//mysql-container é o host devido a tag --link na hora de criação do container
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{}) // Abro uma conexão com o banco de dados

	if err != nil {
		fmt.Println("Conexão Falhou")
	} else {
		fmt.Println("Conexão Sucedida")
	}

	return db

}
