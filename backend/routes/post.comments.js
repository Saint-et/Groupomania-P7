//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/comments');

//obtenir tous les profils
router.get('/comments', auth, postCtrl.getAllCommentsPost);


router.post('/comments', auth, postCtrl.postOneCommentsPost);

//obtenir un profil
router.get('/comments/:id', auth, postCtrl.getOneCommentsPost);

router.get('/comments/user/:userId', auth, postCtrl.getAllCommentsPostByUser);

//modifier un message
router.put('/comments/edite/:id', auth, postCtrl.updateCommentsPost);

//supprimer un message
router.delete('/comments/delete/:id', auth, postCtrl.deleteCommentsPost);

module.exports = router;