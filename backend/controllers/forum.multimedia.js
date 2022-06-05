const Messagemedia = require('../models/forummedia');
const { models } = require('../db/mysql');

console.log(models);

const fs = require('fs');


exports.getAllMessageMedia = async (req,res,next) => (
    await Messagemedia.findAll({order: [
      ['createdAt', 'DESC'],
  ],attributes: ['id','message','imageUrl','createdAt'], include: [models.users]})
    .then(message => {
        return  res.status(200).json({ message })
    })
);

exports.getOneMessageMedia = async (req,res,next) => (
    await Messagemedia.findOne({ where: { id: req.params.id }})
    .then(message => {
        return res.status(200).json({ message });
    })
);

exports.postOneMessageMedia = async (req,res,next) => {
  console.log(req.body)
    try {

        const messageImg = req.file ?
        {
          ...req.body,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {
          ...req.body
        }
        const message = Messagemedia.build({
            userId: messageImg.userId,
            message: messageImg.message,
            imageUrl: messageImg.imageUrl
        })

        message.save()
            .then(() => res.status(201).json({ message: 'New message created.' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        return (error => res.status(500).json({ error }));
    }
}

exports.updateMessageMedia = async (req,res,next) => (
    await Messagemedia.findOne({ where: { id: req.params.id }})
    .then(message => {
        message.set({
           message: req.body.message,
           image: req.body.image
        });

          message.save(message.dataValues);
          return res.status(200).json({ message: 'Message changed', message })
    })
);

exports.deleteMessageMedia = async (req,res,next) => {
    await Messagemedia.findOne({ where: { id: req.params.id }})
    .then(message => {
      if (message.dataValues.imageUrl != null) {
      const filename = message.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Messagemedia.destroy({ where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'publication deleted.'}))
      .catch(error => res.status(400).json({ error }));
      })
      } else {
        Messagemedia.destroy({ where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'publication deleted.'}))
      .catch(error => res.status(400).json({ error }));
      }
    })
}