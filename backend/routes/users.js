//utilisation d'express
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const profilCtrl = require('../controllers/users');



// get all users
router.get('/users', auth, profilCtrl.getAllUser);

// get one user
router.get('/users/:id', auth, profilCtrl.getOneUser);


// update one user
router.put('/users/update/:id', auth, multer, profilCtrl.updateUser);

// update admin status
router.put('/users/update-admin/:id', auth, profilCtrl.updateAdmin);

// delete one user
router.delete('/users/delete/:id', auth, multer, profilCtrl.deleteUser);


module.exports = router;