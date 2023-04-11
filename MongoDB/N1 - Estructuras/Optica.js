db.createCollection("Optica", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id_gafas", "proveedor", "gafa", "cliente"],
            properties: {
                id_gafas: {
                    bsonType: "number"
                },
                proveedor: {
                    bsonType: "object",
                    required: ["nombre", "telefono", "NIF"],
                    properties: {
                        nombre: {
                            bsonType: "string"
                        },
                        direccion: {
                            bsonType: "object",
                            required: ["calle", "ciudad", "CP"],
                            properties: {
                                calle: {
                                    bsonType: "string"
                                },
                                numero: {
                                    bsonType: "number"
                                },
                                piso: {
                                    bsonType: "number"
                                },
                                puerta: {
                                    bsonType: "number"
                                },
                                ciudad: {
                                    bsonType: "string"
                                },
                                CP: {
                                    bsonType: "number"
                                },
                                pais: {
                                    bsonType: "string"
                                }
                            }
                        },
                        telefono: {
                            bsonType: "number"
                        },
                        fax: {
                            bsonType: "string"
                        },
                        NIF: {
                            bsonType: "number"
                        }
                    }
                },
                gafa: {
                    bsonType: "object",
                    required: ["marca", "graduacion", "montura", "color_cristal", "precio"],
                    properties: {
                        marca: {
                            bsonType: "string"
                        },
                        graduacion: {
                            bsonType: "object",
                            required: ["cristal_derecho", "cristal_izquierdo"],
                            properties: {
                                cristal_derecho: {
                                    bsonType: "number"
                                },
                                cristal_izquierdo: {
                                    bsonType: "number"
                                }
                            }
                        },
                        montura: {
                            bsonType: "object",
                            required: ["tipo", "color"],
                            properties: {
                                tipo: {
                                    bsonType: "string"
                                },
                                color: {
                                    bsonType: "string"
                                }
                            }
                        },
                        color_cristal: {
                            bsonType: "object",
                            required: ["color_derecho", "color_izquierdo"],
                            properties: {
                                color_derecho: {
                                    bsonType: "string"
                                },
                                color_izquierdo: {
                                    bsonType: "string"
                                }
                            }
                        },
                        precio: {
                            bsonType: "number"
                        }
                    }
                },
                cliente: {
                    bsonType: "object",
                    required: ["nombre", "direccion", "telefono", "correo_electronico", "fecha_registro", "vendedor"],
                    properties: {
                        nombre: {
                            bsonType: "string"
                        },
                        direccion: {
                            bsonType: "object",

                        },
                        telefono: {
                            bsonType: "number"
                        },
                        correo_electronico: {
                            bsonType: "string"
                        },
                        fecha_registro: {
                            bsonType: "date"
                        },
                        recomendacion: {
                            bsonType: "string"
                        },
                        vendedor: {
                            bsonType: "string"
                        }
                    }
                }
            }
        }
    }
})


db.Optica.insertOne({
    "id_gafas": "G001",
    "proveedor": {
        "nombre": "Proveedor 1",
        "direccion": {
            "calle": "Calle del Proveedor 1",
            "numero": 123,
            "piso": 1,
            "puerta": "2B",
            "ciudad": "Madrid",
            "CP": "28001",
            "pais": "España"
        },
        "telefono": "+34 912 345 678",
        "fax": "fax",
        "NIF": "A12345678"
    },
    "gafa": {
        "marca": "Marca 1",
        "graduacion": {
            "cristal derecho": "+2.50",
            "cristal izquierdo": "+2.00"
        },
        "montura": {
            "tipo": "Completa",
            "color": "Negro"
        },
        "color_cristal": {
            "color_derecho": "Gris",
            "color_izquierdo": "Gris"
        },
        "precio": 100.00
    },
    "cliente": {
        "nombre": "Cliente 1",
        "direccion": "Calle del Cliente 1, 456, 3ºA, Madrid, 28002, España",
        "telefono": "+34 612 345 678",
        "correo_electronico": "cliente1@example.com",
        "fecha_registro": new Date("2023-04-11"),
        "recomendacion": "Amigo",
        "vendedor": "Luis Amador"
    }
})