const EntitySchema = require("typeorm").EntitySchema

const usuarioEntity = new EntitySchema({

    name: "usuarios",
    columns: {
        usuario: {
            type: "varchar",
            unique: true
        },
        email: {
            type: "varchar",
            unique: true
        },
        password: {
            type: "varchar"
        },
        id: {
            primary: true,
            type: "int",
            generated: true
        }
    }
})

module.exports = usuarioEntity