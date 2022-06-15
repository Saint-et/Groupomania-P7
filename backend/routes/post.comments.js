//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/comments');

// get all comment
router.get('/comments', auth, postCtrl.getAllCommentsPost);

// post one comment
router.post('/comments', auth, postCtrl.postOneCommentsPost);

// update one comment
router.put('/comments/edite/:id', auth, postCtrl.updateCommentsPost);

// delete one comment
router.delete('/comments/delete/:id', auth, postCtrl.deleteCommentsPost);

module.exports = router;