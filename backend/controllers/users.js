const User = require('../models/login.signup');

const fs = require('fs');

exports.getAllUser = async (req, res, next) => {
    User.findAll({attributes: ['firstName','lastName','email','imageUrl','isAdmin']})
        .then(user => {
        return res.status(200).json({ user })
        })
}

exports.getOneUser = async (req,res,next) => {
    await User.findOne({ where: { id: req.params.id }, attributes: ['id','firstName','lastName','email','imageUrl','isAdmin']})
    .then(user => {
        return res.status(200).json({ user })
    })
}

exports.updateUser = async (req, res, next) => {
    await User.findOne({ where: { id: req.params.id }})
    .then((userFind) => {
        console.log(req.body);


    const userImg = req.file ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
      ...req.body
    }

    if (userFind._previousDataValues.imageUrl == null || userImg.image == userFind._previousDataValues.imageUrl) {
      console.log(0);
        User.update({ ...userImg }, {where : { id: req.params.id }});
        return res.status(200).json({ message: 'user changed' });
    } else {
        if (userImg.image == userFind._previousDataValues.imageUrl || userImg.image != null) {
            console.log(1);
            const filename = userFind.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
            User.update({ ...userImg, imageUrl: null }, {where : { id: req.params.id }});
          return res.status(200).json({ message: 'Message changed' })});
          } else {
            console.log(2);
        const filename = userFind.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            User.update({ ...userImg }, {where : { id: req.params.id }});
          return res.status(200).json({ message: 'Message changed' })});
          }
    }
    
  })  
};

exports.updateAdmin = async (req, res, next) => {
  await User.findOne({ where: { id: req.params.id }})
  .then((userFind) => {
    console.log(userFind);
    console.log(req.body);
    User.update({ isAdmin: req.body.isAdmin }, {where : { id: req.params.id }});
       return res.status(200).json({ message: 'user changed' });
  })}

exports.deleteUser = async (req, res, next) => {
    await User.destroy({ where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'User deleted.'}))
      .catch(error => res.status(400).json({ error }));
};
