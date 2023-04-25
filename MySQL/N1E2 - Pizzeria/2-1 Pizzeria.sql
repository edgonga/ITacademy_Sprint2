
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
);

CREATE TABLE Productes (
    id INT NOT NULL UNSIGNED,
    nom VARCHAR(20) NOT NULL,
    descripcio VARCHAR(55),
    imatge BINARY,
    preu DOUBLE NOT NULL UNSIGNED,
    id_categoria INT NOT NULL UNSIGNED,
    PRIMARY KEY (id)
    FOREIGN KEY (id) REFERENCES Comandes(id_producte)
);

CREATE TABLE Categoria (
    id INT NOT NULL UNSIGNED,
    versio_estacional INT NOT NULL UNSIGNED,
    nom VARCHAR(20) NOT NULL UNSIGNED,
    PRIMARY KEY (id, versio_estacional),
    FOREIGN KEY (id) REFERENCES Productes(id_categoria)
);

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
);

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
);

-- Insertar registro en la tabla Comandes
INSERT INTO Comandes (id, data, per_recollir, id_producte, Quant_pizzes, Quant_begudes, Quant_burgers, preu_total, id_client, id_repartidor, id_botiga)
VALUES (1, '2023-04-25 12:30:00', 1, 1, 2, 1, 0, 23.50, 2, 2, 1);

INSERT INTO Comandes (id, data, per_recollir, id_producte, Quant_pizzes, Quant_begudes, Quant_burgers, preu_total, id_client, id_repartidor, id_botiga)
VALUES (1, '2023-04-25 12:30:00', 1, 2, 0, 1, 0, 3.50, 1, 2, 1);


-- Insertar registro en la tabla Productes
INSERT INTO Productes (id, nom, descripcio, imatge, preu, id_categoria)
VALUES (1, 'Pizza Margherita', 'Pizza amb tomàquet, mozzarella i alfàbrega', NULL, 8.50, 1);

-- Insertar registro en la tabla Categoria
INSERT INTO Categoria (id, versio_estacional, nom)
VALUES (1, 1, 'Pizza');

INSERT INTO Categoria (id, versio_estacional, nom)
VALUES (2, 2, 'Begudes');

INSERT INTO Categoria (id, versio_estacional, nom)
VALUES (3, 3, 'Hamburguesa');

-- Insertar registro en la tabla Clients
INSERT INTO Clients (id, nom, cognoms, domicili, codi_postal, localitat, provincia, telefon)
VALUES (1, 'Juan', 'García', 'Carrer de Balmes, 123', 08191, 'Rubí', 'Barcelona', 935555555);

INSERT INTO Clients (id, nom, cognoms, domicili, codi_postal, localitat, provincia, telefon)
VALUES (2, 'Maria', 'Lato', 'Carrer de Sepulveda, 23', 08008, 'Barcelona', 'Barcelona', 935543555);

-- Insertar registro en la tabla TreballadorBotiga
INSERT INTO TreballadorBotiga (id_treballador, id_botiga, nom_treballador, cognoms, NIF, telefon, nom_botiga, domicili, codi_postal, localitat, provincia, es_repartidor)
VALUES (2, 1, 'María', 'López', 12345678A, 937777777, 'Pizzeria La Bella Napoli', 'Carrer de Pau Claris, 123', 08009, 'Barcelona', 'Barcelona', 0);

INSERT INTO TreballadorBotiga (id_treballador, id_botiga, nom_treballador, cognoms, NIF, telefon, nom_botiga, domicili, codi_postal, localitat, provincia, es_repartidor)
VALUES (1, 1, 'Gemma', 'Autarch', 12345611A, 937777779, 'Pizzeria La Bella Napoli', 'Carrer de Pau Claris, 123', 08009, 'Barcelona', 'Barcelona', 1);

-- Lista cuantos productos de tipo “Begudes”. se han vendido en una determinada localidad
SELECT Co.data, Pr.nom, Cl.localitat
FROM Comandes AS Co
INNER JOIN Categoria AS Pr ON Co.id_producte = Pr.id
INNER JOIN Clients AS Cl ON Co.id_client = Cl.id
INNER JOIN Categoria AS Ca ON Pr.id_categoria = Ca.id
WHERE Ca.nom = "Begudes" AND Cl.localitat = "Rubí"

-- Lista cuantas comandas ha efectuado un determinado empleado/a.

SELECT T.id_treballador, T.nom_treballador, Co.id, Co.data
FROM TreballadorBotiga AS T 
INNER JOIN Comandes AS Co ON T.id_botiga = Co.id_botiga