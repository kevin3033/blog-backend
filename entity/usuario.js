const EntitySchema = require("typeorm").EntitySchema

const usuario = new EntitySchema({
    tableName: "usuarios",
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

module.exports = usuario