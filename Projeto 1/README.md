# Avaliação

# 📖 Sobre

Esta é uma api simples que realiza CRUD de um Produto.

Ela funciona dentro de um docker que possui 2 imagens, uma de Golang para rodar a api e outra Mysql para utilização de um banco de dados.

# 🔨 Ferramentas

Api:
    - Golang
    - Docker
    - Fiber
    - Mysql
    - Gorm


# 🏗 Instalação

- Clone o projeto

```
git clone https://github.com/grhdiogo/avaliacao.git
```

- Entre na pasta avaliacao/projeto1 e rode

```
docker-compose up -d
```


- Inicialize o bando de dados com o script sql fornecido e substitua user e pass por -u'Usuário' e -p'Pass' ex: -uroot -proot , caso user e pass sejam root

```
docker exec -i mysql-container mysql "user" "pass" < database/scripts/script.sql
```

# 🏗 Execução

Com uma ferramenta de realizar consultas http pode executar as seguites:

Envie um json com os dados Name do tipo string, Description do tipo string, Price do tipo double e Stock do tipo number, ex:
{
	"Name":"Brinco de ouro",
	"Description":"Brinco banhado a ouro",
	"Price":10.35,
	"Stock":3
}
```
Método: Post
localhost:8000/createProduct
```

Retorna um json com todos os produtos cadastrados
```
Método: Get
localhost:8000/
```

Envie um json com qualquer atributo que você queira alterar, e o id do produto que você deseja alterar no link ex:
{
	"Price":100,
	"Stock":10
}
```
Método: Get
localhost:8000/id
```




