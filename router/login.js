const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const bd = require("../bd/typeorm")
const chaveSecreta = require("../chaveSecreta")

router.post('/', async (req, res) => {
    let { usuario, senha } = req.body
    let bdUsuario = bd.getRepository("usuarios")
    let teste = await bdUsuario.findOneBy({usuario: usuario})
    if (!teste) {
        console.log(`erro em tentativa de login: usuario não existente.`)
        return res.status(401).json("usuario incorreto")
    } else {
        let senhacerta = teste.password
        bcrypt.compare(senha, senhacerta, (err, result) => {
            if (err || !result) {
                console.log(`erro em tentativa de login: senha incorreta.`)
                return res.status(401).json("senha incorreta")
            } else {
                let id = teste.id
                let token = jwt.sign({ id }, chaveSecreta, {
                    expiresIn: 1800
                })
                console.log(`sucesso em tentativa de login: usuario logado. conta: ${teste}`)
                return res.status(202).json(token.toString())
            }
        })
    }
})

module.exports = router