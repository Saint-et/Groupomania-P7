//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const profilCtrl = require('../controllers/profil');



// obtenir tous les profiles
router.get('/users', auth, profilCtrl.getAllUser);
router.post('/users', auth, profilCtrl.getAllUser);

//obtenir un profil
router.get('/users/:userId', auth, profilCtrl.getOneUser);

//modifier un utilisateur
router.put('/users/:userId', auth, profilCtrl.updateUser);

//supprimer un utilisateur
router.delete('/users/:userId', auth, profilCtrl.deleteUser);

// supression
//router.delete('/:id', auth,profilCtrl.deleteProfil);


module.exports = router;