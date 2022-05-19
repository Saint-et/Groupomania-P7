//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/forum.multimedia');

router.get('/forumMultimedia', auth, messageCtrl.getAllMessageMedia);


router.post('/forumMultimedia', auth, messageCtrl.postOneMessageMedia);

//obtenir un profil
router.get('/forumMultimedia/:messageId', auth, messageCtrl.getOneMessageMedia);

//modifier un message
router.put('/forumMultimedia/:messageId', auth, messageCtrl.updateMessageMedia);

//supprimer un message
router.delete('/forumMultimedia/:messageId', auth, messageCtrl.deleteMessageMedia);

module.exports = router;