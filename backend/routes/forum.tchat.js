//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/forum.tchat');

//obtenir tous les message
router.get('/forumTchat', auth, messageCtrl.getAllMessage);

//poster un message
router.post('/forumTchat', auth, messageCtrl.postOneMessage);

//obtenir un profil
router.get('/forumTchat/:messageId', auth, messageCtrl.getOneMessage);

//modifier un message
router.put('/forumTchat/:messageId', auth, messageCtrl.updateMessage);

//supprimer un message
router.delete('/forumTchat/:messageId', auth, messageCtrl.deleteMessage);

module.exports = router;