const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const bd = require("../bd/typeorm")
const chaveSecreta = require("../chaveSecreta")

router.post('/', async (req, res) => {
    let { nome, senha } = req.body
    let bdUsuario = bd.getRepository("usuarios")
    let teste = await bdUsuario.findOneBy({email: nome})
    if (!teste) {
        console.log('erro ao achar o email no banco de dados.')
        return res.send('email ou senha inseridos estão incorretos. ')
    } else {
        let senhac = teste.password
        bcrypt.compare(senha, senhac, (err, result) => {
            if (err || !result) {
                console.log('senha incorreta.')
                return res.send('senha incorreta. ')
            } else {
                let id = teste.id
                let token = jwt.sign({ id }, chaveSecreta, {
                    expiresIn: 1800
                })
                return res.json({
                    auth: true,
                    messagem: "voce se conectou a conta. ",
                    token: token
                })
            }
        })
    }
})

module.exports = router