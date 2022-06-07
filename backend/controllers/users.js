const User = require('../models/login.signup');


exports.getAllUser = async (req, res, next) => {
    User.findAll({attributes: ['firstName','lastName','email']})
        .then(user => {
        return res.status(200).json({ user })
        })
}

exports.getOneUser = async (req,res,next) => {
    await User.findOne({ where: { id: req.params.id }})
    .then(user => {
        return res.status(200).json({ user })
    })
}

exports.updateUser = async (req, res, next) => {
    await User.findOne({ where: { id: req.params.id }})
    .then(user => {
        user.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            isAdmin: req.body.isAdmin
          });

          user.save(user.dataValues);
          return res.status(200).json({ message: 'user changed', user })
    })
};

exports.deleteUser = async (req, res, next) => {
    await User.destroy({ where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'User deleted.'}))
      .catch(error => res.status(400).json({ error }));
};
