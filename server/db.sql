-- For practice
CREATE TABLE products(id INT, name VARCHAR(50),price INT,on_sale BOOLEAN);
ALTER TABLE products ADD COLUMN featured BOOLEAN;
ALTER TABLE products DROP COLUMN featured;
DROP TABLE products;
DROP DATABASE practice;

CREATE DATABASE yelp;
CREATE TABLE restaurants(id INT, name VARCHAR(50),location VARCHAR(50), price_range INT);
INSERT INTO restaurants (id,name,location,price_range) values (123,'MC_Donalds','New_York',3);
INSERT INTO restaurants (id,name,location,price_range) values (124,'pizza_hut','vegas',2);
DROP TABLE restaurants;

-- Actual Commands

CREATE TABLE restaurants(id BIGSERIAL NOT NULL, name VARCHAR(50) NOT NULL,location VARCHAR(50) NOT NULL, price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5), PRIMARY KEY(id));
CREATE TABLE reviews(id BIGSERIAL NOT NULL PRIMARY KEY, restaurant_id BIGINT NOT NULL, name VARCHAR(50) NOT NULL, review TEXT NOT NULL, rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5), FOREIGN KEY(restaurant_id) REFERENCES restaurants(id));
