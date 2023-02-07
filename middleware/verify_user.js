const chaveSecreta = require("../chaveSecreta")
const jwt = require('jsonwebtoken')

function verifyUser(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json("nenhuma conta indentificada.");
    
    jwt.verify(token, chaveSecreta, function(err, decoded) {
      if (err) return res.status(500).json("conta inválida.");
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

module.exports = verifyUser