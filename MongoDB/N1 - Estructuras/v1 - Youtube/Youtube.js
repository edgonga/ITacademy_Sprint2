db.createCollection("Youtube", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [Usuario_id, Usuario],
            properties: {
                Usuario_id: {
                    bsonType: "string"
                },
                Usuario: {
                    bsonType: "object",
                    required: ["Email", "Password", "Nombre", "FechaNacimiento"],
                    properties: {
                        Email: {
                            bsonType: "string",
                            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
                        },
                        Password: {
                            bsonType: "string"
                        },
                        Nombre: {
                            bsonType: "string"
                        },
                        FechaNacimiento: {
                            bsonType: "date"
                        },
                        Sexo: {
                            bsonType: "string"
                        },
                        Pais: {
                            bsonType: "string"
                        },
                        CP: {
                            bsonType: "string", "pattern": "^[0-9]{5}$"
                        }
                    }
                },
                Videos: {
                    bsonType: "object",
                    required: ["Titulo", "Tamano", "NombreArchivo", "Duracion", "Thumbnail", "Reproducciones", "Likes", "Dislikes", "Estado", "HoraPublicacion"],
                    properties: {
                        Titulo: {
                            bsonType: "string"
                        },
                        Descripcion: {
                            bsonType: "string"
                        },
                        Tamano: {
                            bsonType: "integer"
                        },
                        NombreArchivo: {
                            bsonType: "string"
                        },
                        Duracion: {
                            bsonType: "integer"
                        },
                        Thumbnail: {
                            bsonType: "string"
                        },
                        Reproducciones: {
                            bsonType: "integer"
                        },
                        Likes: {
                            bsonType: "integer"
                        },
                        Dislikes: {
                            bsonType: "integer"
                        },
                        Estado: {
                            bsonType: "string",
                            enum: ["publico", "oculto", "privado"]
                        },
                        Hashtag: {
                            bsonType: "object",
                            properties: {
                                Hashtag_id: {
                                    bsonType: "string"
                                },
                                Nombre: {
                                    bsonType: "string"
                                }
                            }
                        },
                        Publicador: {
                            bsonType: "string"
                        },
                        HoraPublicacion: {
                            bsonType: "date"
                        }
                    },
                }
            },
            Canal: {
                bsonType: "object",
                required: ["NombreCanal", "FechaCreacion"],
                properties: {
                    NombreCanal: {
                        bsonType: "string"
                    },
                    Descripcion: {
                        bsonType: "string"
                    },
                    FechaCreacion: {
                        bsonType: "date"
                    }
                },

            },
            Suscripciones: {
                bsonType: "object",
                required: ["Canal", "UsuarioCanal"],
                properties: {
                    Canal: {
                        bsonType: "string"
                    },
                    UsuarioCanal: {
                        bsonType: "string"
                    }
                },
            },
            Reacciones: {
                bsonType: "object",
                required: ["Likes", "Dislikes"],
                properties: {
                    Likes: {
                        bsonType: "object",
                        required: ["Video", "HoraReaccion"],
                        properties: {
                            Video: {
                                bsonType: "string"
                            },
                            UsuarioVideo: {
                                bsonType: "string"
                            },
                            HoraReaccion: {
                                bsonType: "date"

                            }
                        }
                    },
                    Dislike: {
                        bsonType: "array",
                        required: ["Video", "HoraReaccion"],
                        properties: {
                            Video: {
                                bsonType: "string"
                            },
                            UsuarioVideo: {
                                bsonType: "string"
                            },
                            HoraReaccion: {
                                bsonType: "date"
                            }
                        },

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
            },

        },
        Comentarios: {
            bsonType: "object",
            required: ["Video", "Texto", "HoraComentario"],
            properties: {
                Video: {
                    bsonType: "string"
                },
                Texto: {
                    bsonType: "string"
                },
                HoraComentario: {
                    bsonType: "date"
                }
            },

        }
    },
    ReaccionesComentario: {
        bsonType: "object",
        required: ["Likes", "Dislikes"],
        properties: {
            Likes: {
                bsonType: "object",
                required: ["Video", "UsuarioVideo", "UsuarioComentario", "HoraReaccion"],
                properties: {
                    Video: {
                        bsonType: "string"
                    },
                    UsuarioVideo: {
                        bsonType: "string"
                    },
                    UsuarioComentario: {
                        bsonType: "string"
                    },
                    Texto: {
                        bsonType: "string"
                    },
                    HoraReaccion: {
                        bsonType: "date"
                    }
                },

            },
            Dislike: {
                bsonType: "object",
                required: ["Video", "UsuarioVideo", "UsuarioComentario", "HoraReaccion"],
                properties: {
                    Video: {
                        bsonType: "string"
                    },
                    UsuarioVideo: {
                        bsonType: "string"
                    },
                    UsuarioComentario: {
                        bsonType: "string"
                    },
                    Texto: {
                        bsonType: "string"
                    },
                    HoraReaccion: {
                        bsonType: "date"
                    }
                },

            }
        }

    }
})

db.Youtube.insertOne({
    UsuarioID: "abc123",
    Usuario: {
      Email: "example@gmail.com",
      Password: "password123",
      Nombre: "John Doe",
      FechaNacimiento: new Date("1990-01-01"),
      Sexo: "Masculino",
      Pais: "Estados Unidos",
      CP: "12345"
    },
    Videos: {
      Titulo: "My First Video",
      Descripcion: "This is my very first video on YouTube!",
      Tamano: 1024,
      NombreArchivo: "my_first_video.mp4",
      Duracion: 60,
      Thumbnail: "thumbnail.jpg",
      Reproducciones: 0,
      Likes: 0,
      Dislikes: 0,
      Estado: "publico",
      Hashtag: {
        Hashtag_id: "123",
        Nombre: "#firstvideo"
      },
      Publicador: "John Doe",
      HoraPublicacion: new Date("2022-01-01")
    },
    Canal: {
      NombreCanal: "JohnDoeOfficial",
      Descripcion: "Welcome to my official YouTube channel!",
      FechaCreacion: new Date("2022-01-01")
    },
    Suscripciones: {
      Canal: "JaneDoeOfficial",
      UsuarioCanal: "JaneDoe"
    },
    Reacciones: {
      Likes: {
        Video: "my_first_video.mp4",
        UsuarioVideo: "JaneDoe",
        HoraReaccion: new Date("2022-01-01")
      },
      Dislike: []
    },
    Playlist: {
      Video: "my_first_video.mp4",
      FechaCreacion: new Date("2022-01-01"),
      Estado: "publico"
    },
    Comentarios: {
      Video: "my_first_video.mp4",
      Texto: "Great video! Keep up the good work!",
      HoraComentario: new Date("2022-01-01")
    },
    ReaccionesComentario: {
      Likes: {
        Video: "my_first_video.mp4",
        UsuarioVideo: "JaneDoe",
        UsuarioComentario: "JohnDoe",
        Texto: "Thanks for the comment!",
        HoraReaccion: new Date("2022-01-01")
      },
      Dislike: []
    }
  });
  