CREATE DATABASE test;

\c test

CREATE TABLE users(
    id int NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO users (id, email, name)
VALUES (1, 'jane.doe@mail.com', 'Jane Doe');

INSERT INTO users (id, email, name)
VALUES (2, 'joe.doe@mail.com', 'John Doe');