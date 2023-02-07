
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