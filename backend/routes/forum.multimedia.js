//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const messageCtrl = require('../controllers/forum.multimedia');

//obtenir tous les profils
router.get('/forum', auth, messageCtrl.getAllMessageMedia);


router.post('/forum', auth, multer, messageCtrl.postOneMessageMedia);

//obtenir un profil
router.get('/forum/:id', auth, messageCtrl.getOneMessageMedia);
router.get('/forum/user/:userId', auth, messageCtrl.getAllMessageMediaByUser);

//modifier un message
router.put('/forum/edite/:id', auth, multer, messageCtrl.updateMessageMedia);

//supprimer un message
router.delete('/forum/delete/:id', auth, messageCtrl.deleteMessageMedia);

module.exports = router;