const typeorm = require('typeorm')

const dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: "3306",
    username: "seunome",
    password: "suasenha",
    database: "teste5",
    synchronize: true,
    entities: require("../entity/index")
})

module.exports = dataSource
