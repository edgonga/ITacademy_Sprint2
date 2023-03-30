
DROP DATABASE IF EXISTS youtube;
CREATE DATABASE youtube CHARACTER SET utf8mb4;
USE youtube;

CREATE TABLE Usuari (
    id_usuari INT NOT NULL,
    nom_usuari VARCHAR(40) NOT NULL, 
    email VARCHAR(40) NOT NULL, 
    usuari_password VARCHAR(40) NOT NULL,
    data_naixament TIME,
    sexe ENUM('hombre', 'mujer', 'otro') NOT NULL,
    pais VARCHAR(40),
    codi_postal VARCHAR(5) NOT NULL,
    CONSTRAINT chk_codi_postal CHECK (codi_postal REGEXP '^[0-9]{5}$')
    PRIMARY KEY (id_usuari)
)

CREATE TABLE Videos (
    id_video INT NOT NULL UNSIGNED,
    nom_usuari VARCHAR(40) NOT NULL,
    descripcio VARCHAR(40),
    tamany INT,
    thumbnail BLOB NOT NULL,
    n_reproduccions INT UNSIGNED,
    n_likes INT UNSIGNED,
    n_dislikes INT UNSIGNED,
    id_usuari INT NOT NULL UNSIGNED,
    estat_public BOOLEAN NOT NULL,
    estat_ocult BOOLEAN NOT NULL,
    estat_privat BOOLEAN NOT NULL,
    publicacio TIME,
    PRIMARY KEY (id_video)
)

CREATE TABLE Video_like (
    id_usuari INT NOT NULL,
    id_video INT NOT NULL,
    hora TIME,
    PRIMARY KEY(id_usuari, id_video),
    CONSTRAINT `FK_Usuari_VideoLike` FOREIGN KEY (id_usuari) REFERENCES Usuari (id_usuari)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Video_VideoLike` FOREIGN KEY (id_video) REFERENCES Videos (id_videos)
        ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE Video_dislike (
    id_usuari INT NOT NULL,
    id_video INT NOT NULL,
    hora TIME,
    PRIMARY KEY(id_usuari, id_video),
    CONSTRAINT `FK_Usuari_VideoDislike` FOREIGN KEY (id_usuari) REFERENCES Usuari (id_usuari)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Video_VideoDislike` FOREIGN KEY (id_video) REFERENCES Videos (id_videos)
        ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE Etiquetas (
    id_etiqueta INT NOT NULL,
    nom_etiqueta VARCHAR(40) NOT NULL,
    PRIMARY KEY (id_etiqueta)
)

CREATE TABLE Video_etiqueta (
    id_usuari INT NOT NULL,
    id_etiqueta INT NOT NULL,
    PRIMARY KEY(id_usuari, id_etiqueta),
    CONSTRAINT `FK_Usuari_VideoEtiqueta`  FOREIGN KEY (id_usuari) REFERENCES Usuari (id_usuari)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Etiqueta_VideoEtiqueta` FOREIGN KEY (id_etiqueta) REFERENCES Etiquetas (id_etiqueta)
        ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE Usuari_canal (
    id_usuari INT NOT NULL,
    id_canal INT NOT NULL,
    nom_canal VARCHAR(40) NOT NULL,
    descr_canal VARCHAR(40),
    hora_creacio TIME,
    PRIMARY KEY (id_usuari, id_canal)
    CONSTRAINT `FK_Usuari_UsuariCanal` FOREIGN KEY (id_usuari) REFERENCES Usuari (id_usuari)
        ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE Subscripcio_canal (
    id_usuari INT NOT NULL,
    id_canal INT NOT NULL,
    hora_subscripcio TIME,
    PRIMARY KEY (id_usuari, id_canal)
    CONSTRAINT `FK_Canal_SubscripcioCanal` FOREIGN KEY (id_canal) REFERENCES Usuari_canal (id_canal)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Usuari_SubscripcioCanal` FOREIGN KEY (id_usuari) REFERENCES Usuari (id_usuari)
        ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE Playlist_usuari (
    id_usuari INT NOT NULL,
    id_playlist INT NOT NULL,
    nom_playlist VARCHAR(35) NOT NULL,
    estat_public BOOLEAN NOT NULL,
    estat_privat BOOLEAN NOT NULL,
    hora_creacio TIME,
    PRIMARY KEY (id_usuari, id_playlist),
    CONSTRAINT `FK_Video_PlaylistUsuari` FOREIGN KEY (id_video) REFERENCES Video (id_video)
        ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE Video_playlist (
    id_playlist INT NOT NULL,
    id_video INT NOT NULL,
    PRIMARY KEY (id_playlist, id_video)
    CONSTRAINT `FK_Video_VideoPlaylist` FOREIGN KEY (id_video) REFERENCES Video (id_video)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Playlist_VideoPlaylist` FOREIGN KEY (id_playlist) REFERENCES Playlist_usuari (id_playlist)
        ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE Usuari_comentari_video (
    id_usuari INT NOT NULL,
    id_video INT NOT NULL,
    id_comentari INT NOT NULL,
    text_comentari VARCHAR(50) NOT NULL,
    hora_comentari TIME,
    PRIMARY KEY (id_usuari, id_video, id_comentari),
    CONSTRAINT `FK_Video_UsuariComentariVideo` FOREIGN KEY (id_video) REFERENCES Video (id_video)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Usuari_UsuariComentariVideo` FOREIGN KEY (id_usuari) REFERENCES Usuari (id_usuari)
        ON UPDATE CASCADE ON DELETE CASCADE
)

CREATE TABLE like_comentari (
    id_comentari INT NOT NULL,
    id_usuari INT NOT NULL,
    dislike BOOLEAN NOT NULL,
    PRIMARY KEY (id_usuari, id_comentari),
    CONSTRAINT `FK_Usuari_LikeComentari` FOREIGN KEY (id_usuari) REFERENCES Usuari (id_usuari)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `FK_Comentari_LikeComentari` FOREIGN KEY (id_comentari) REFERENCES Usuari_comentari_video (id_comentari)
        ON UPDATE CASCADE ON DELETE CASCADE
)