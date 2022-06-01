//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const messageCtrl = require('../controllers/forum.multimedia');

//obtenir tous les profils
router.get('/forum', messageCtrl.getAllMessageMedia);


router.post('/forum', auth, multer, messageCtrl.postOneMessageMedia);

//obtenir un profil
router.get('/forum/:messageId', auth, messageCtrl.getOneMessageMedia);

//modifier un message
router.put('/forum/:messageId', auth, multer, messageCtrl.updateMessageMedia);

//supprimer un message
router.delete('/forum/:messageId', auth, messageCtrl.deleteMessageMedia);

module.exports = router;