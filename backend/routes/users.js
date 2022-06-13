//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const profilCtrl = require('../controllers/users');



// obtenir tous les profiles
router.get('/users', auth, profilCtrl.getAllUser);

//obtenir un profil
router.get('/users/:id', auth, profilCtrl.getOneUser);


//modifier un utilisateur
router.put('/users/update/:id', auth, multer, profilCtrl.updateUser);

//modifier un utilisateur
router.put('/users/update-admin/:id', auth, profilCtrl.updateAdmin);

//supprimer un utilisateur
router.delete('/users/delete/:id', auth, multer, profilCtrl.deleteUser);

// supression
//router.delete('/:id', auth,profilCtrl.deleteProfil);


module.exports = router;