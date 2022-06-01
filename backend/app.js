const express = require('express');
const path = require('path');


//route à suivre depuis le backend
const userRoutes = require('./routes/login.signup');
const groupomaniaRoutes = require('./routes/users');
const forum_multimedia = require('./routes/forum.multimedia');


const app = express();
app.use(express.json());


//Erreurs de CORS _ accepte les requête entre server avec une adresse différente
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/auth', userRoutes);
app.use('/api/groupomania', groupomaniaRoutes);
app.use('/api/groupomania', forum_multimedia);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;