CREATE DATABASE IF NOT EXISTS avaliacao;

USE avaliacao;

CREATE TABLE IF NOT EXISTS products(
    id INT(11) AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    price decimal(10,2),
    stock int(5),
    PRIMARY KEY(id)

);

INSERT INTO products VALUE(0,'Colar','Colar de ogro',11.3,5);
INSERT INTO products VALUE(0,'Brinco','Brinco Tuvala',15,10);
INSERT INTO products VALUE(0,'Armadura','Armadura Tuvala',15,10);
INSERT INTO products VALUE(0,'Bota','Bota Tuvala',15,10);
