const router  = require('express').Router()
const bcrypt = require('bcrypt')
const bd = require("../bd/typeorm")

router.post('/', async (req, res) => {
    let { usuario, email, senha } = req.body
    let bdUsuario = bd.getRepository("usuarios")
    let testeUsuario = await bdUsuario.findOneBy({usuario: usuario})
    let testeEmail = await bdUsuario.findOneBy({email: email})
    if (testeUsuario) {
        console.log(`erro em tentativa de cadastro: usuario já existente. conta: ${testeUsuario}`)
        return res.status(400).send({error: "erro. usuario já cadastrado"})
    } else if (testeEmail) {
        console.log(`erro em tentativa de cadastro: email já existente. conta: ${testeEmail}`)
        return res.status(400).send({error: "erro. email já cadastrado"})
    } else {
        bcrypt.hash(senha, 2, async (err, hash) => {
            if (err) {
                console.log(`erro em tentativa de cadastro: erro ao criptografar a senha. erro: ${err}`)
                return res.status(500).send({error: "ocorreu um erro no servidor. tente novamente mais tarde."})
            } else {
                let novoUsuario = {
                    usuario: usuario,
                    email: email,
                    password: hash
                }
                
                bdUsuario.save(novoUsuario).then(usuarioSalvo => {
                    console.log(`sucesso em tentativa de cadastro: novo usuario cadastrado. conta: ${usuarioSalvo}`)
                    res.status(200).send({ok: "usuario cadastrado."})
                }).catch(err => {
                    console.log(`erro em tentativa de cadastro: erro ao criptografar a senha. erro: ${err}`)
                    return res.status(500).send({error: "ocorreu um erro no servidor. tente novamente mais tarde."})
                })
            }        
        })
    }
})

/////// remover ou proteger método get

router.get('/', (req, res) => {
    let bdUsuario = bd.getRepository("usuarios")
    bdUsuario.find().then(todos => {
        res.json(todos)
    }).catch(err => {
        console.log("erro: ", err)
        res.send("inviável... ")
    })
})

module.exports = router