
DROP DATABASE IF EXISTS pizzeria;
CREATE DATABASE pizzeria CHARACTER SET utf8mb4;
USE pizzeria;

CREATE TABLE Comandes (
    id INT NOT NULL UNSIGNED,
    data TIMESTAMP NOT NULL,
    per_recollir BOOLEAN NOT NULL,
    id_producte INT UNSIGNED,
    IFNULL(Quant_pizzes INT UNSIGNED, 0),
    IFNULL(Quant_begudes INT UNSIGNED, 0),
    IFNULL(Quant_burgers INT UNSIGNED, 0),
    preu_total DOUBLE NOT NULL UNSIGNED,
    id_client INT UNSIGNED,
    id_repartidor INT UNSIGNED,
    id_botiga INT UNSIGNED
    PRIMARY KEY (id)
)

CREATE TABLE Productes (
    id INT NOT NULL UNSIGNED,
    nom VARCHAR(20) NOT NULL,
    descripcio VARCHAR(55),
    imatge BINARY,
    preu DOUBLE NOT NULL UNSIGNED,
    id_categoria INT NOT NULL UNSIGNED,
    PRIMARY KEY (id)
    FOREIGN KEY (id) REFERENCES Comandes(id_producte)
)

CREATE TABLE Categoria (
    id INT NOT NULL UNSIGNED,
    versio_estacional INT NOT NULL UNSIGNED,
    nom VARCHAR(20) NOT NULL UNSIGNED,
    PRIMARY KEY (id, versio_estacional),
    FOREIGN KEY (id) REFERENCES Productes(id_categoria)
)

CREATE TABLE Clients (
    id INT NOT NULL UNSIGNED,
    nom VARCHAR(20) NOT NULL,
    cognoms VARCHAR(55) NOT NULL,
    domicili VARCHAR(55),
    codi_postal INT UNSIGNED,
    localitat VARCHAR(20),
    provincia VARCHAR(20),
    telefon INT NOT NULL UNSIGNED,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES Comandes(id_client)
)

CREATE TABLE TreballadorBotiga (
    id_treballador INT NOT NULL UNSIGNED,
    id_botiga INT NOT NULL UNSIGNED,
    nom_treballador VARCHAR(20) NOT NULL,
    cognoms VARCHAR(55) NOT NULL,
    NIF INT UNIQUE NOT NULL,
    telefon INT UNSIGNED,
    nom_botiga VARCHAR(20) NOT NULL,
    domicili VARCHAR(20),
    codi_postal INT UNSIGNED,
    localitat VARCHAR(20),
    provincia VARCHAR(20),
    es_repartidor BOOLEAN,
    PRIMARY KEY (id_treballador, id_botiga),
    FOREIGN KEY (id_treballador) REFERENCES Comandes(id_repartidor),
    FOREIGN KEY (id_botiga) REFERENCES Comandes(id_botiga)
)