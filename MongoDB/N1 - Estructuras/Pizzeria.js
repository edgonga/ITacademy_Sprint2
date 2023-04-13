db.createCollection("Pizzeria", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id_pedido", "Cliente", "Pedido", "Tienda"],
            properties: {
                id_pedido: {
                    bsonType: "int", "minimum": 1
                },
                Cliente: {
                    bsonType: "object",
                    required: ["NombreCliente", "ApellidoCliente", "TelefonoCliente"],
                    properties: {
                        NombreCliente: { bsonType: "string" },
                        ApellidoCliente: { bsonType: "string" },
                        Direccion: { bsonType: "string" },
                        CP: { bsonType: "string", "pattern": "^[0-9]{5}$" },
                        Localidad: { bsonType: "string" },
                        Provincia: { bsonType: "string" },
                        TelefonoCliente: { bsonType: "string", "pattern": "^[0-9]{9}$" }
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
                            required: ["Pizza", "Hamburguesa", "Bebida"],
                            properties: {
                                Pizza: {
                                    bsonType: "object",
                                    properties: {
                                        NombrePizza: { bsonType: "string" },
                                        Descripcion: { bsonType: "string" },
                                        Imagen: { bsonType: "string" },
                                        PrecioUnitario: { bsonType: "decimal" },
                                        Cantidad: { bsonType: "int" },
                                        CategoriaPizza: { bsonType: "string" }
                                    }
                                },
                                Hamburguesa: {
                                    bsonType: "object",
                                    properties: {
                                        NombreHamburguesa: { bsonType: "string" },
                                        Descripcion: { bsonType: "string" },
                                        Imagen: { bsonType: "string" },
                                        PrecioUnitario: { bsonType: "decimal" },
                                        Cantidad: { bsonType: "int" }
                                    },
                                    allOf: [   // Intentaremos validar que si el subdocumento Hamburguesa está presente,
                                               // solo entonces, los campos NombreHamburguesa, PrecioUnitario y Cantidad
                                               // serán obligatorios. No obstante, como el cliente puede ser que haga un pedido
                                               // dónde no pida ninguna Hamburguesa, éste subdocumento no será obligatorio
                                               // Solo lo aplicaremos a las Hamburguesas para comprobar que funciona correctamente,
                                               
                                        {
                                            $or: [
                                                { Hamburguesa: { $exists: false } },
                                                {
                                                    $and: [
                                                        { 'Hamburguesa.NombreHamburguesa': { $exists: true } },
                                                        { 'Hamburguesa.PrecioUnitario': { $exists: true } },
                                                        { 'Hamburguesa.Cantidad': { $exists: true } }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                Bebida: {
                                    bsonType: "object",
                                    properties: {
                                        NombreBebida: { bsonType: "string" },
                                        Descripcion: { bsonType: "string" },
                                        Imagen: { bsonType: "string" },
                                        PrecioUnitario: { bsonType: "decimal" },
                                        Cantidad: { bsonType: "int" }
                                    }
                                }
                            }
                        },
                        PrecioTotal: {
                            bsonType: "decimal",
                            readOnly: true, // Para que no se pueda modificar manualmente
                            expression: {   // Intentamos que este campo se calcule directamente como la suma del producto de 
                                $sum: {     // PrecioUnitario * Cantidad para Bebida, Pizza y Hamburguesas
                                    $map: {
                                        input: {
                                            $objectToArray: $Comida
                                        },
                                        in: {
                                            $multiply: [$$this.v.PrecioUnitario, $$this.v.Cantidad]
                                            // Al aplicar $objectToArray convertimos en un array clave (k) valor (v) el objecto Comida
                                            // de tal manera que al hacer $$this.v.PrecioUnitario estamos haciendo referencia al valor (precio unitario)
                                            // de la comida en cuestión y $$this.v.Cantidad al valor (la cantidad) de la comida en cuestión
                                        }
                                    }
                                }
                            }
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
                            bsonType: "string", "pattern": "^[0-9]{5}$"
                        },
                        Localidad: {
                            bsonType: "string"
                        },
                        Provincia: {
                            bsonType: "string"
                        },
                        Trabajadores: {
                            bsonType: "object",
                            required: ["NombreTrabajador", "ApellidoTrabajador", "NIF", "Telefono", "Repartidor", "HoraReparto"],
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
                                TelefonoCliente: {
                                    bsonType: "string", "pattern": "^[0-9]{9}$"
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
})

db.Optica.insertOne({
    id_pedido: 1234,
    Cliente: {
        NombreCliente: "Juan",
        ApellidoCliente: "Pérez",
        Direccion: "Calle Mayor 123",
        CP: "28001",
        Localidad: "Madrid",
        Provincia: "Madrid",
        TelefonoCliente: "910000000"
    },
    Pedido: {
        Fecha: new Date("2023-04-13"),
        ParaLlevar: true,
        Comida: {
            Pizza: {
                NombrePizza: "Margarita",
                Descripcion: "Tomate, mozzarella y albahaca",
                Imagen: "https://miimagen.com/margarita.jpg",
                PrecioUnitario: 8.5,
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
        Trabajadores: [
            {
                NombreTrabajador: "María",
                ApellidoTrabajador: "García",
                NIF: "12345678A",
                Telefono: "911111111",
                Repartidor: true,
                HoraReparto: new Date("2023-04-13T20:00:00Z")
            },
            {
                NombreTrabajador: "Pedro",
                ApellidoTrabajador: "Martínez",
                NIF: "87654321B",
                Telefono: "922222222",
                Repartidor: false
            }
        ]
    }
})

