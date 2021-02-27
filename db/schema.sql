DROP DATABASE IF EXISTS easytrack.db;
CREATE DATABASE easytrack.db;
USE easytrack.db;

CREATE TABLE department(
    id INTEGER PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles(
    id INTEGER PRIMARY KEY,
    role_title VARCHAR(30),
    salary DECIMAL,
    dept_id INTEGER
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER

);




