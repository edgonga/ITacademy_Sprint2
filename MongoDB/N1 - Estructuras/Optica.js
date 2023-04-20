const schema = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id_gafas", "proveedor", "gafa", "cliente"],
            properties: {
                id_gafas: {
                    bsonType: "string"
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
                                    bsonType: "string"
                                },
                                ciudad: {
                                    bsonType: "string"
                                },
                                CP: {
                                    bsonType: "string",
                                    pattern: "^[0-9]{5}$"
                                },
                                pais: {
                                    bsonType: "string"
                                }
                            }
                        },
                        telefono: {
                            bsonType: "string",
                            pattern: "^[0-9]{9}$"
                        },
                        fax: {
                            bsonType: "string"
                        },
                        NIF: {
                            bsonType: "string"
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
                    required: ["nombre", "telefono", "correo_electronico", "fecha_registro", "vendedor"],
                    properties: {
                        nombre: {
                            bsonType: "string"
                        },
                        direccion: {
                            bsonType: "string"
                        },
                        telefono: {
                            bsonType: "number"
                        },
                        correo_electronico: {
                            bsonType: "string",
                            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
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
}

const opticaData = {
    id_gafas: "G001",
    proveedor: {
        nombre: "Proveedor 1",
        direccion: {
            calle: "Calle del Proveedor 1",
            numero: 123,
            piso: 1,
            puerta: "2B",
            ciudad: "Madrid",
            CP: "28001",
            pais: "España"
        },
        telefono: "912345678",
        fax: "fax",
        NIF: "A12345678"
    },
    gafa: {
        marca: "Marca 1",
        graduacion: {
            cristal_derecho: 2,
            cristal_izquierdo: 2
        },
        montura: {
            tipo: "Completa",
            color: "Negro"
        },
        color_cristal: {
            color_derecho: "Gris",
            color_izquierdo: "Gris"
        },
        precio: 100
    },
    cliente: {
        nombre: "Cliente 1",
        direccion: "Calle del Cliente 1, 456, 3ºA, Madrid, 28002, España",
        telefono: 612345678,
        correo_electronico: "cliente1@example.com",
        fecha_registro: new Date("2023-04-11"),
        recomendacion: "Amigo",
        vendedor: "Luis Amador"
    }
}

const { MongoClient } = require('mongodb')

const url = "mongodb+srv://RestoConnection:1edgOnga1123@cluster0.2nrtxap.mongodb.net/test"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect()
    .then(() => {
        console.log("Conectado a servidor Mongo DB correctamente")
        const collection = client.db("test").createCollection("Optica", schema)
        return collection.then((collection) => {
            return collection.insertOne(opticaData)
            .then(() => {
                console.log("La inserción de datos se ha realizado correctamente")
            })
            .catch((err) => {
                console.error(err)
            })
        })
    })
    .then(() => {
        client.close()
        console.log("Script finalizado");
    })
    .catch((err) => {
        client.close()
        console.dir(err)
    })






// async function run() {
//     try {
//         await client.connect()
//         const database = client.db("test")
//         const collection = database.collection("Optica")

//         const inputData = {
//             id_gafas: "G001",
//             proveedor: {
//                 nombre: "Proveedor 1",
//                 direccion: {
//                     calle: "Calle del Proveedor 1",
//                     numero: 123,
//                     piso: 1,
//                     puerta: "2B",
//                     ciudad: "Madrid",
//                     CP: "28001",
//                     pais: "España"
//                 },
//                 telefono: "912345678",
//                 fax: "fax",
//                 NIF: "A12345678"
//             },
//             gafa: {
//                 marca: "Marca 1",
//                 graduacion: {
//                     cristal_derecho: 2,
//                     cristal_izquierdo: 2
//                 },
//                 montura: {
//                     tipo: "Completa",
//                     color: "Negro"
//                 },
//                 color_cristal: {
//                     color_derecho: "Gris",
//                     color_izquierdo: "Gris"
//                 },
//                 precio: 100
//             },
//             cliente: {
//                 nombre: "Cliente 1",
//                 direccion: "Calle del Cliente 1, 456, 3ºA, Madrid, 28002, España",
//                 telefono: 612345678,
//                 correo_electronico: "cliente1@example.com",
//                 fecha_registro: new Date("2023-04-11"),
//                 recomendacion: "Amigo",
//                 vendedor: "Luis Amador"
//             }
//         }

//         //const outputValidation = await collection.validate(inputData, { validator: schema })

//         // if (outputValidation.valid) {
//         //     console.log("Document is valid");
//         // } else {
//         //     console.log("Document is NOT valid");
//         // }
//     } catch (err) {
//         console.log(err)

//     } finally {
//         await client.close()
//     }
// }

// run()