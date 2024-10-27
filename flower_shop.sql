CREATE DATABASE IF NOT EXISTS flowerShop;

USE flowerShop

CREATE TABLE IF NOT EXISTS customers(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(30),
    email VARCHAR(100),
    address VARCHAR(80)
)

CREATE TABLE IF NOT EXISTS status(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
)

CREATE TABLE IF NOT EXISTS flowers(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    color VARCHAR(50),
    price DECIMAL,
    flower_type VARCHAR(100),
    photo VARCHAR(50),
    import_from VARCHAR(50)
)

CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    customer_id INTEGER,
    total_price DECIMAL,
    order_date DATETIME,
    status_id INTEGER,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (status_id) REFERENCES status(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)



CREATE TABLE IF NOT EXISTS order_details(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    order_id INTEGER,
    flower_id INTEGER,
    quantity TINYINT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (flower_id) REFERENCES flowers(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

INSERT INTO customers(first_name,last_name,phone,email,address)
VALUES("Aziz","Azizov",'123-45-67','azizov@gmail.com','Toshkent Yakkatol 38'),
("Avaz","Avazov",'000-00-00','avazov@gmail.com',"Toshkent Do'stlik 10"),
("Botir","Botirov",'111-11-11','botirov@gmail.com','Samarqand Quruvchi 7'),
("Salim","Salimov",'444-44-44','salimov@gmail.com','Buxoro Fazogir 22'),
("Anvar","Anvarov",'222-22-22','azizov@gmail.com','Toshkent Yakkatol 8');

INSERT INTO flowers(name,color,price,flower_type,photo,import_from)
VALUES('arhideya','pink',210000,'Perenial','arhideya.webp','Tokyo'),
('rose','red',150000,'Bulb','atirgul.webp','Amsterdam'),
('chinnigul','pink',100000,'Epiphyte','chinnigul.webp','Paris'),
("cactus",'green',80000,'Annual','kaktus.webp','Mexico'),
('lola','red',300000,'Perennial','lola.webp','Tashkent')

INSERT INTO status(name)
VALUES ("tayyor"),("yo'lda"),("tayyor")

INSERT INTO orders(customer_id,total_price,order_date,status_id)
VALUES (1,0,'2024:01:22',1),(5,0,'2024:10:13',3)

INSERT INTO order_details(order_id,flower_id,quantity)
VALUES(1,2,40),(2,4,50)

SELECT * from orders

SHOW TABLES

SELECT DISTINCT c.first_name, c.last_name FROM customers c
        LEFT JOIN orders o ON c.id = o.customer_id
        Left JOIN order_details od ON o.id = od.order_id
        LEFT JOIN flowers f ON od.flower_id = f.id
        WHERE o.order_date BETWEEN '2023-01-01' AND '2025-01-01' AND f.name like "%oq atirgul%"

    
SELECT DISTINCT f.name FROM flowers f
LEFT JOIN order_details od ON f.id = od.flower_id
LEFT JOIN orders o ON od.order_id = o.id
LEFT JOIN customers c ON o.customer_id = c.id
WHERE c.first_name = "Aziz" and c.last_name = "Azizov" and o.order_date BETWEEN '2024-01-01' AND '2024-11-11';