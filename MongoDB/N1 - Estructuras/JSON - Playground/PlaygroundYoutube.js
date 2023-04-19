db.createCollection("Usuario", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["UsuarioID", "PropiedadesUsuario", "Canal", "Suscripciones", "Reacciones", "Playlist"],
            properties: {
                UsuarioID: {
                    bsonType: "objectId",
                    description: "El identificador único del usuario"
                },
                PropiedadesUsuario: {
                    bsonType: "object",
                    required: ["Email", "Password", "NombreUsuario", "FechaNacimiento"],
                    properties: {
                        Email: {
                            bsonType: "string",
                            description: "La dirección de correo electrónico del usuario"
                        },
                        Password: {
                            bsonType: "string",
                            description: "La contraseña del usuario"
                        },
                        NombreUsuario: {
                            bsonType: "string",
                            description: "El nombre del usuario"
                        },
                        FechaNacimiento: {
                            bsonType: "date",
                            description: "La fecha de nacimiento del usuario"
                        },
                        Sexo: {
                            bsonType: "string",
                            description: "El género del usuario"
                        },
                        Pais: {
                            bsonType: "string",
                            description: "El país del usuario"
                        },
                        CP: {
                            bsonType: "string",
                            description: "El código postal del usuario"
                        }
                    }
                },
                Canal: {
                    bsonType: "object",
                    required: ["NombreCanal", "Descripcion", "FechaCreacion"],
                    properties: {
                        NombreCanal: {
                            bsonType: "string",
                            description: "El nombre del canal del usuario"
                        },
                        Descripcion: {
                            bsonType: "string",
                            description: "La descripción del canal del usuario"
                        },
                        FechaCreacion: {
                            bsonType: "date",
                            description: "La fecha de creación del canal del usuario"
                        }
                    }
                },
                Suscripciones: {
                    bsonType: "object",
                    required: ["Canal", "UsuarioCanal"],
                    properties: {
                        Canal: {
                            bsonType: "string",
                            description: "El nombre del canal al que está suscrito el usuario"
                        },
                        UsuarioCanal: {
                            bsonType: "string",
                            description: "El nombre del usuario que es propietario del canal al que está suscrito el usuario"
                        }

                    }
                },
                Reacciones: {
                    bsonType: "object",
                    properties: {
                        Likes: {
                            bsonType: "object",
                            required: ["Video", "UsuarioVideo", "HoraReaccion"],
                            properties: {
                                Video: {
                                    bsonType: "string",
                                    description: "El nombre del video al que el usuario dio like"
                                },
                                UsuarioVideo: {
                                    bsonType: "string",
                                    description: "El nombre del usuario que subió el video al que el usuario dio like"
                                },
                                HoraReaccion: {
                                    bsonType: "date",
                                    description: "La hora en que el usuario dio like al video"
                                }
                            }
                        },
                        Dislike: {
                            bsonType: "object",
                            required: ["Video", "UsuarioVideo", "HoraReaccion"],
                            properties: {
                                Video: {
                                    bsonType: "string",
                                },
                                UsuarioVideo: {
                                    bsonType: "string",
                                    description: "El nombre del usuario que subió el video al que el usuario dio like"
                                },
                                HoraReaccion: {
                                    bsonType: "date",
                                    description: "La hora en que el usuario dio like al video"
                                }
                            }
                        }
                    }
                },
                Playlist: {
                    bsonType: "object",
                    required: ["Video", "FechaCreacion", "Estado"],
                    properties: {
                        Video: {
                            bsonType: "string"
                        },
                        FechaCreacion: {
                            bsonType: "date"
                        },
                        Estado: {
                            bsonType: "string",
                            enum: ["publico", "privado"]
                        }
                    }
                }
            }
        }
    }
})

db.Usuario.insertOne({
    UsuarioID: ObjectId("012345678901012345678901"),
    PropiedadesUsuario: {
        Email: "ejemplo@ejemplo.com",
        Password: "123456",
        NombreUsuario: "joselito_92",
        FechaNacimiento: new Date("1990-01-01"),
        Sexo: "Masculino",
        Pais: "España",
        CP: "28001"
    },
    Canal: {
        NombreCanal: "Canal de Ejemplo",
        Descripcion: "Este es el canal de ejemplo",
        FechaCreacion: new Date("2007-02-09")
    },
    Suscripciones: {
        Canal: "Canal de Prueba",
        UsuarioCanal: "Usuario de Prueba"
    },
    Reacciones: {
        Likes: {
            Video: "Video de Prueba",
            UsuarioVideo: "Usuario de Prueba",
            HoraReaccion: new Date("2018-12-11")
        }
    },
    Playlist: {
        Video: "Video de Prueba",
        FechaCreacion: new Date("2023-05-07"),
        Estado: "publico"
    },
})

db.createCollection("Video", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["VideoID", "PropiedadesVideo", "Comentarios", "ReaccionesComentarios"],
            properties: {
                VideoID: {
                    bsonType: "objectId",
                    description: "El identificador único del video"
                },
                PropiedadesVideo: {
                    bsonType: "object",
                    required: ["Titulo", "Descripcion", "Tamano", "NombreArchivo", "Duracion", "Thumbnail", "Reproducciones", "Likes", "Dislikes", "Estado", "Hashtag", "Publicador", "FechaPublicacion"],
                    properties: {
                        Titulo: {
                            bsonType: "string",
                            description: "El título del video"
                        },
                        Descripcion: {
                            bsonType: "string",
                            description: "La descripción del video"
                        },
                        Tamano: {
                            bsonType: "int",
                            description: "El tamaño del video en bytes"
                        },
                        NombreArchivo: {
                            bsonType: "string",
                            description: "El nombre del archivo de video"
                        },
                        Duracion: {
                            bsonType: "int",
                            description: "La duración del video en segundos"
                        },
                        Thumbnail: {
                            bsonType: "string",
                            description: "El nombre del archivo de la miniatura del video"
                        },
                        Reproducciones: {
                            bsonType: "int",
                            description: "El número de reproducciones del video"
                        },
                        Likes: {
                            bsonType: "int",
                            description: "El número de likes del video"
                        },
                        Dislikes: {
                            bsonType: "int",
                            description: "El número de dislikes del video"
                        },
                        Estado: {
                            bsonType: "string",
                            enum: ["publico", "oculto", "privado"],
                            description: "El estado del video"
                        },
                        Hashtag: {
                            bsonType: "object",
                            required: ["HashtagID", "NombreHashtag"],
                            properties: {
                                HashtagID: {
                                    bsonType: "objectId",
                                    description: "El identificador único del hashtag"
                                },
                                NombreHashtag: {
                                    bsonType: "string",
                                    description: "El nombre del hashtag"
                                }
                            }
                        },
                        Publicador: {
                            bsonType: "string",
                            description: "El nombre del usuario que publicó el video"
                        },
                        FechaPublicacion: {
                            bsonType: "date",
                            description: "La fecha de publicación del video"
                        }
                    }
                },
                Comentarios: {
                    bsonType: "object",
                    required: ["UsuarioComentario", "Texto", "FechaComentario"],
                    properties: {
                        UsuarioComentario: {
                            bsonType: "string",
                            description: "El nombre del usuario que hizo el comentario"
                        },
                        Texto: {
                            bsonType: "string",
                            description: "El texto del comentario"
                        },
                        FechaComentario: {
                            bsonType: "date",
                            description: "La fecha del comentario"
                        }

                    }
                },
                ReaccionesComentarios: {
                    bsonType: "object",
                    properties: {
                        Likes: {
                            bsonType: "object",
                            required: ["UsuarioComentario", "Texto", "HoraCreacion"],
                            properties: {
                                UsuarioComentario: {
                                    bsonType: "string"
                                },
                                Texto: {
                                    bsonType: "string"
                                },
                                HoraComentario: {
                                    bsonType: "string"
                                }
                            }
                        },
                        Dislike: {
                            bsonType: "object",
                            required: ["UsuarioComentario", "Texto", "HoraCreacion"],
                            properties: {
                                UsuarioComentario: {
                                    bsonType: "string"
                                },
                                Texto: {
                                    bsonType: "string"
                                },
                                HoraComentario: {
                                    bsonType: "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})

db.videos.insertOne({
    VideoID: ObjectId("012345678901012345678901"),
    PropiedadesVideo: {
        Titulo: "Título de Ejemplo",
        Descripcion: "Esta es la descripción del video de ejemplo",
        Tamano: 50,
        NombreArchivo: "ejemplo.mp4",
        Duracion: 1922,
        Thumbnail: "thumbnail_ejemplo.jpg",
        Reproducciones: 1220,
        Likes: 120,
        Dislikes: 20,
        Estado: "publico",
        Hashtag: [{
                HashtagID: ObjectId("021345678901012345678901"),
                NombreHashtag: "ejemplo"
            },
            {
                HashtagID: ObjectId("102345678901012345678901"),
                NombreHashtag: "prueba"
            }
        ],
        Publicador: "UserXXX",
        FechaPublicacion: new Date("2018-12-11")
    },
    Comentarios: [{
            UsuarioComentario: "Usuario de Prueba",
            Texto: "Este es un comentario de prueba",
            FechaComentario: new Date("2018-12-11")
        },
        {
            UsuarioComentario: "Usuario de Test",
            Texto: "Este es otro comentario de prueba",
            FechaComentario: new Date("2018-12-11")
        }
    ],
    ReaccionesComentarios: {
        Dislikes: {
            UsuarioComentario: "Usuario de Prueba",
            Texto: "Este comentario me ha gustado",
            HoraCreacion: new Date("2018-12-11")
        }
    }
})