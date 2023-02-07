const router = require("express").Router()
const bd = require("../bd/typeorm")
const verifyUser = require("../middleware/verify_user")

router.post("/", verifyUser, async (req, res) => {
    let { usuario, titulo, descricao } = req.body

    let bdPost = bd.getRepository("posts")

    bdPost.save({usuario: usuario, titulo: titulo, descricao: descricao}).then(obj => {
        console.log("um post foi publicado.")
        res.status(200).json("post publicado com sucesso.")
    }).catch(err => {
        console.log("erro ao publicar um post. erro: ", err);
        res.status(500).json("ocorreu um erro no servidor. tente novamente mais tarde.")
    })
})

router.get("/", async (req, res) => {
    let bdPost = bd.getRepository("posts")
    bdPost.find().then(todos => {
        res.json(todos)
    }).catch(err => {
        console.log("erro: ", err)
        res.send("inviável... ")
    })
})

module.exports = router