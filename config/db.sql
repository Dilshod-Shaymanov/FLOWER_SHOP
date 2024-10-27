-- Active: 1722882035328@@127.0.0.1@3306@flower_shop
-- Active: 1722882035328@@127.0.0.1@3306@flower_shop
CREATE DATABASE flower_shop;

USE flower_shop;

CREATE TABLE clients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE flowers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    color VARCHAR(50),
    type VARCHAR(50),
    price DECIMAL(10, 2),
    quantity BIGINT
);

CREATE TABLE bouquets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    descreption VARCHAR(255),
    price DECIMAL(10, 2),
    avialble_status ENUM('available', 'unavailable')
);

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT,
    order_date DATE,
    total_amount DECIMAL(10, 2),
    status ENUM('pending', 'completed', 'canceled')
);

CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    product_type ENUM('flower', 'bouquet'),
    product_id BIGINT,
    quantity BIGINT,
    price DECIMAL(10, 2)
);

INSERT INTO clients (fname, lname, email) VALUES
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com'),
('Mike', 'Brown', 'mike.brown@example.com'),
('Anna', 'Davis', 'anna.davis@example.com'),
('Chris', 'Wilson', 'chris.wilson@example.com');

INSERT INTO flowers (name, color, type, price, quantity) VALUES
('Rose', 'Red', 'Fresh', 2.50, 100),
('Tulip', 'Yellow', 'Fresh', 1.50, 200),
('Lily', 'White', 'Fresh', 3.00, 150),
('Orchid', 'Purple', 'Fresh', 5.00, 50),
('Daisy', 'Pink', 'Fresh', 1.00, 300);




USE flower_shop;

CREATE TABLE flowers_log(
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    msg VARCHAR(255) NOT NULL,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    row_id INT(11) NOT NULL
);

DROP TRIGGER insert_flowers;

DROP TRIGGER IF EXISTS insert_flowers;

CREATE TRIGGER insert_flowers
AFTER INSERT ON flowers
FOR EACH ROW
BEGIN
    INSERT INTO flowers_log (msg, row_id) VALUES ('Inserted new row', NEW.id);
END;

SHOW TABLES;
