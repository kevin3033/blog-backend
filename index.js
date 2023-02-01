const express = require('express')

const bd = require("./bd/typeorm")

const { cadastro, login } = require('./router/index')

bd.initialize()
    .then(() => {
        console.log("conectado ao banco de dados!")
        const app = express()
        app.use(express.json())
        
        //rotas
        app.use("/cadastro", cadastro)
        app.use('/login', login)
        app.listen(3000, () => {
            console.log("servidor iniciado. backend rodando.");
        })
    })
    .catch(err => {
        console.log("erro ao se conectar ao banco de dados, servidor não iniciado. erro: ", err)
    })

