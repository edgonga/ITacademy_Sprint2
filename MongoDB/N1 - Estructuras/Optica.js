db.dropDatabase()

db.createCollection("Optica", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["id_gafas", "proveedor", "gafa", "cliente"],
            propierties: {
                id_gafas
            }
        }
    }
})