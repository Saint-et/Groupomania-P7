//Utilisation de la variable d'environnement
require("dotenv").config({path: "../env/.env"});
//utilisation de jsonwebtoken pour le token d'authentification
const jwt = require('jsonwebtoken');


//vérification du token d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const id = decodedToken.id;
    req.auth = { id };
    if (req.body.id && req.body.id !== id) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};