const schema = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id_pedido", "Cliente", "Pedido", "Tienda"],
            properties: {
                id_pedido: {
                    bsonType: "number"
                },
                Cliente: {
                    bsonType: "object",
                    required: ["NombreCliente", "ApellidoCliente", "TelefonoCliente"],
                    properties: {
                        NombreCliente: { bsonType: "string" },
                        ApellidoCliente: { bsonType: "string" },
                        Direccion: { bsonType: "string" },
                        CP: { bsonType: "string", pattern: "^[0-9]{5}$" },
                        Localidad: { bsonType: "string" },
                        Provincia: { bsonType: "string" },
                        TelefonoCliente: { bsonType: "string", pattern: "^[0-9]{9}$" }
                    }
                },
                Pedido: {
                    bsonType: "object",
                    required: ["Fecha", "ParaLlevar", "Comida", "PrecioTotal"],
                    properties: {
                        Fecha: { bsonType: "date" },
                        ParaLlevar: { bsonType: "bool" },
                        Comida: {
                            bsonType: "object",
                            properties: {
                                Pizza: {
                                    bsonType: "object",
                                    properties: {
                                        NombrePizza: { bsonType: "string" },
                                        Descripcion: { bsonType: "string" },
                                        Imagen: { bsonType: "string" },
                                        PrecioUnitario: { bsonType: "number" },
                                        Cantidad: { bsonType: "number" },
                                        CategoriaPizza: { bsonType: "string" }
                                    }
                                },
                                Hamburguesa: {
                                    bsonType: "object",
                                    properties: {
                                        NombreHamburguesa: { bsonType: "string" },
                                        Descripcion: { bsonType: "string" },
                                        Imagen: { bsonType: "string" },
                                        PrecioUnitario: { bsonType: "number" },
                                        Cantidad: { bsonType: "number" }
                                    },
                                    
                                },
                                Bebida: {
                                    bsonType: "object",
                                    properties: {
                                        NombreBebida: { bsonType: "string" },
                                        Descripcion: { bsonType: "string" },
                                        Imagen: { bsonType: "string" },
                                        PrecioUnitario: { bsonType: "number" },
                                        Cantidad: { bsonType: "number" }
                                    }
                                }
                            }
                        },
                        PrecioTotal: {
                            bsonType: "number"
                        }
                    }
                },
                Tienda: {
                    bsonType: "object",
                    required: ["NombreTienda", "CP", "Localidad", "Provincia", "Trabajadores"],
                    properties: {
                        NombreTienda: {
                            bsonType: "string"
                        },
                        CP: {
                            bsonType: "string", pattern: "^[0-9]{5}$"
                        },
                        Localidad: {
                            bsonType: "string"
                        },
                        Provincia: {
                            bsonType: "string"
                        },
                        Trabajadores: {
                            bsonType: "object",
                            required: ["NombreTrabajador", "ApellidoTrabajador", "NIF", "TelefonoTrabajador", "Repartidor"],
                            properties: {
                                NombreTrabajador: {
                                    bsonType: "string"
                                },
                                ApellidoTrabajador: {
                                    bsonType: "string"
                                },
                                NIF: {
                                    bsonType: "string"
                                },
                                TelefonoTrabajador: {
                                    bsonType: "string", pattern: "^[0-9]{9}$"
                                },
                                Repartidor: {
                                    bsonType: "bool"
                                },
                                HoraReparto: {
                                    bsonType: "date"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const pizzeriaData = {
    id_pedido: 1234,
    Cliente: {
        NombreCliente: "Juan",
        ApellidoCliente: "Pérez",
        Direccion: "Calle Mayor 123",
        CP: "28001",
        Localidad: "Madrid",
        Provincia: "Madrid",
        TelefonoCliente: "9100000001"
    },
    Pedido: {
        Fecha: new Date("2023-04-13"),
        ParaLlevar: true,
        Comida: {
            Pizza: {
                NombrePizza: "Margarita",
                Descripcion: "Tomate, mozzarella y albahaca",
                Imagen: "https://miimagen.com/margarita.jpg",
                PrecioUnitario: 8,
                Cantidad: 2,
                CategoriaPizza: "Clásica"
            },
            Hamburguesa: {
                NombreHamburguesa: "Bacon Cheeseburger",
                Descripcion: "Carne, queso cheddar y bacon",
                Imagen: "https://miimagen.com/bacon-cheeseburger.jpg",
                PrecioUnitario: 10,
                Cantidad: 1
            },
            Bebida: {
                NombreBebida: "Coca-Cola",
                Descripcion: "Refresco de cola",
                Imagen: "https://miimagen.com/coca-cola.jpg",
                PrecioUnitario: 2,
                Cantidad: 3
            }
        },
        PrecioTotal: 28.5
    },
    Tienda: {
        NombreTienda: "Pizza House",
        CP: "28001",
        Localidad: "Madrid",
        Provincia: "Madrid",
        Trabajadores: 
            {
                NombreTrabajador: "Pedro",
                ApellidoTrabajador: "Martínez",
                NIF: "87654321B",
                TelefonoTrabajador: "922222222",
                Repartidor: false
            }
    }
}

const { MongoClient } = require('mongodb')

const url = "mongodb+srv://RestoConnection:1edgOnga1123@cluster0.2nrtxap.mongodb.net/test"
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
const dbPizzeria = "test"
const collectionPizzeria = "Pizzeria"

client.connect()
    .then(() => {
        console.log(`Se ha conectado correctamente a la bbdd ${dbPizzeria}`)
        const collection = client.db(dbPizzeria).createCollection(collectionPizzeria, schema)
        return collection.then((collection) => {
            return collection.insertOne(pizzeriaData)
            .then(() => {
                console.log(`Se ha creado correctamente la colección ${collectionPizzeria} en la bbdd ${dbPizzeria}`)
            })
            .catch((err) => {
                console.error(`------------> ${err}`);
            })
        })
    })
    .then(() => {
        client.close()
        console.log("Script finalizado");
    })
    .catch((err) => {
        client.close()
        console.error(`..................... ${err}`)
    })