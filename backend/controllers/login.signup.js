//Utilisation de la variable d'environnement
require("dotenv").config({path: "../env/.env"});
//route model user
const User = require('../models/login.signup');

require("uuid")

//utilisation de bcrypt pour crypter le mot de passe
const bcrypt = require('bcrypt');

//utilisation de jsonwebtoken pour le token d'authentification
const jwt = require('jsonwebtoken');


//inscription avec vérification Email et hash mot de passe
exports.signup = (req, res, next) => {
  if (req.body.email == undefined) {
    return res.status(400).json({ message: 'refresh the page' });
  }
  
  if (req.body.password != req.body.password_verification) {
    return res.status(400).json({ message: 'passwords must be the same.' })
  }
  if (req.body.password.length < 6) {
    return res.status(400).json({ message: 'Password too small.' })
  }
    bcrypt.hash(req.body.password, 10)
    
    .then(hash => {
    
User.findOne({ where:{ email: req.body.email }})
.then(data => {
         


 try{

  let generate_User_ID = Math.floor(Math.random() * 500000 * 500000)
  const user = User.build({
      userId: generate_User_ID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    })

     user.save()
            .then(() => res.status(201).json({ userId: user,
              //création du token de connexion
              token: jwt.sign(
                { User: user.User },
                process.env.TOKEN_SECRET,
                { expiresIn: '24h' },
              ) }))
            .catch(() => res.status(400).json({ message: 'Existing account.' }))
         
      } catch(err) {
        return res.status(400).send(err);
      }})
      
      })
      .catch(error => res.status(500).json({ error }));
  };

  //connexion avec vérification Email et mot de passe
  exports.login = (req, res, next) => {
    if (req.body.email == undefined) {
      return res.status(400).json({ message: 'refresh the page' });
    }
    User.findOne({ where:{ email: req.body.email }})
    .then(user => {
    try {
      if (!user) {
        return res.status(400).json({ message: 'Non-existent account' });
      } else {
      bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(400).json({ message: 'Incorrect password.' });
            }
            res.status(200).json({
              User: user,
              //création du token de connexion
              token: jwt.sign(
                { User: user.User },
                process.env.TOKEN_SECRET,
                { expiresIn: '24h' },
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
        }
      
    } catch(err) {
      return res.status(400).send(err);
    }
  })
  };