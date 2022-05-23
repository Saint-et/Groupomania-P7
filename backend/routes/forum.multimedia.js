//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/forum.multimedia');

router.get('/forum', auth, messageCtrl.getAllMessageMedia);


router.post('/forum', auth, messageCtrl.postOneMessageMedia);

//obtenir un profil
router.get('/forum/:messageId', auth, messageCtrl.getOneMessageMedia);

//modifier un message
router.put('/forum/:messageId', auth, messageCtrl.updateMessageMedia);

//supprimer un message
router.delete('/forum/:messageId', auth, messageCtrl.deleteMessageMedia);

module.exports = router;