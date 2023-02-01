const typeorm = require('typeorm')

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: "3306",
    username: "seuusuario",
    password: "suasenha",
    database: "teste3",
    synchronize: true,
    entities: require("../entity/index")
})

module.exports = dataSource