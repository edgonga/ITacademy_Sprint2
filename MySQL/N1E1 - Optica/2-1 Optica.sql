
DROP DATABASE IF EXISTS optica;
CREATE DATABASE optica CHARACTER SET utf8mb4;
USE optica;

CREATE TABLE Proveidor (
    NIF VARCHAR(9) NOT NULL UNIQUE,
    nom VARCHAR(20) NOT NULL,
    telefon VARCHAR(9) NOT NULL UNIQUE,
    carrer VARCHAR(50),
    numero INT,
    pis INT,
    porta INT,
    ciutat VARCHAR(25),
    codi_postal VARCHAR(5),
    pais VARCHAR(25),
    fax VARCHAR(15)
    PRIMARY KEY (NIF, nom, telefon)
);

CREATE TABLE Ulleres (
    id INT NOT NULL UNSIGNED,
    marca VARCHAR(20) NOT NULL,
    proveidor VARCHAR(20) NOT NULL,
    graduacio_esq INT,
    graduacio_dr INT,
    tipus_muntura ENUM ('flotant', 'pasta', 'metalica') VARCHAR(8),
    color_muntura VARCHAR(20),
    color_vidre_esq VARCHAR(20),
    color_vidre_dr VARCHAR(20),
    preu DOUBLE NOT NULL UNSIGNED,
    client INT NOT NULL,
    data_venta DATE,
    en_stock BOOLEAN,
    venedor INT,
    PRIMARY KEY (id),
    FOREIGN KEY (proveidor) REFERENCES Proveidor(nom)
    FOREIGN KEY (client) REFERENCES Client(nom)
);

CREATE TABLE Client (
    id INT NOT NULL UNSIGNED,
    nom VARCHAR(55) NOT NULL,
    domicili VARCHAR (55),
    telefon VARCHAR(9) NOT NULL UNIQUE,
    email VARCHAR(55) NOT NULL,
    data_registre DATE,
    id_recomanacio INT UNSIGNED
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES Ulleres(client)
);

CREATE TABLE venedor (
    id INT NOT NULL UNSIGNED,
    nom VARCHAR(55) NOT NULL,
    despedit BOOLEAN,
    PRIMARY KEY(id),
    FOREIGN KEY(id) REFERENCES Ulleres(client)
)

-- Inserción para la tabla Proveidor
INSERT INTO Proveidor (NIF, nom, telefon, carrer, numero, pis, porta, ciutat, codi_postal, pais, fax)
VALUES ('12345678A', 'Proveidor1', '123456789', 'Carrer del Proveidor1', 1, NULL, NULL, 'Barcelona', '08001', 'Espanya', '123456789');

-- Inserción para la tabla Ulleres
INSERT INTO Ulleres (id, marca, proveidor, graduacio_esq, graduacio_dr, tipus_muntura, color_muntura, color_vidre_esq, color_vidre_dr, preu, client, data_venta, en_stock, venedor)
VALUES (1, 'Marca1', 'Proveidor1', -1.25, -1.5, 'flotant', 'Negre', 'Transparent', 'Transparent', 120.50, 1, '2022-03-15', TRUE, 1);

-- Inserción para la tabla Client
INSERT INTO Client (id, nom, domicili, telefon, email, data_registre, id_recomanacio)
VALUES (1, 'Client1', 'Carrer del Client1', '987654321', 'client1@example.com', '2022-03-15', NULL);

-- Inserción para la tabla venedor
INSERT INTO venedor (id, nom, despedit)
VALUES (1, 'Venedor1', FALSE);

-- Lista el total de compras de un cliente
SELECT 
