CREATE DATABASE auth_system;

CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    email varchar(30), 
    name varchar(30),
    password varchar(30)
    );