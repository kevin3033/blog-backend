const router  = require('express').Router()
const bcrypt = require('bcrypt')
const bd = require("../bd/typeorm")

router.post('/', async (req, res) => {
    console.log(req.body)
    let { nome, senha } = req.body
    let bdUsuario = bd.getRepository("usuarios")
    let teste = await bdUsuario.findOneBy({email: nome})
    if (teste) {
        console.log("email já usado!. conta: ", teste)
        return res.send("erro. esse email já está sendo utilizado. tente outro.")
    } else {
        bcrypt.hash(senha, 2, async (err, hash) => {
            if (err) {
                console.log("erro ao criptografar a senha. erro: ", err)
                return res.send("ocorreu um erro no server. tente novamente mais tarde.")
            } else {

                let novoUsuario = {
                    email: nome,
                    password: hash
                }
                
                bdUsuario.save(novoUsuario).then(usuarioSalvo => {
                    console.log("usuario cadastrado!")
                    res.json(usuarioSalvo)
                }).catch(err => {
                    console.log("usuario não cadastrado... erro: ", err)
                    res.send("não consegui cadastrar esse usuario")
                })
            }        
        })
    }
})

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