const EntitySchema = require("typeorm").EntitySchema

const postEntity = new EntitySchema({
    name: "posts",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        titulo: {
            type: "varchar"
        }, 
        descricao: {
            type: "varchar"
        },
        usuario: {
            type: "varchar"
        }
    }
})

module.exports = postEntity