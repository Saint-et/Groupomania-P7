const Messagemedia = require('../models/forummedia');
const { models } = require('../db/mysql');
const fs = require('fs');


exports.getAllMessageMedia = async (req,res,next) => (
    await Messagemedia.findAll({order: [
      ['updatedAt', 'DESC']],
      attributes: ['id','message','imageUrl','userId','createdAt'], include: [models.users]})
    .then(message => {
        return  res.status(200).json({ message })
    })
);

exports.getAllMessageMediaByUser = async (req,res,next) => (
  await Messagemedia.findAll({order: [
    ['updatedAt', 'DESC']], where: { userId: req.params.userId }, include: [models.users]})
  .then(message => {
      return res.status(200).json({ message });
  })
);

exports.getOneMessageMedia = async (req,res,next) => (
    await Messagemedia.findOne({ where: { id: req.params.id }, include: [models.users]})
    .then(message => {
        return res.status(200).json({ message });
    })
);

exports.postOneMessageMedia = async (req,res,next) => {
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

        //console.log( message );

        message.save()
            .then(() => res.status(201).json({ message: 'New message created.' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        return (error => res.status(500).json({ error }));
    }
}

//vérification du post avant update
exports.updateMessageMedia = async (req,res,next) => (
    await Messagemedia.findOne({ where: { id: req.params.id }})
    .then((message) => {

          const messageImg = req.file ?{
            ...req.body,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
          } : {
            ...req.body
          }

        if (messageImg.message === '' && messageImg.image === 'null') {
          console.log(1);
          return (()=> res.status(400).json({ message : 'veuiller renseigné au moins un champs' }));

          } else {

        if (message._previousDataValues.imageUrl == null || messageImg.image == message._previousDataValues.imageUrl) {
          Messagemedia.update({ ...messageImg }, {where : { id: req.params.id }});
          return res.status(200).json({ message: 'Message changed' });
        } else {
          if (messageImg.image == message._previousDataValues.imageUrl || messageImg.image != null) {
            const filename = message.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Messagemedia.update({ ...messageImg, imageUrl: null }, {where : { id: req.params.id }});
          return res.status(200).json({ message: 'Message changed' })});
          } else {
            const filename = message.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Messagemedia.update({ ...messageImg }, {where : { id: req.params.id }});
          return res.status(200).json({ message: 'Message changed' })});
          }      
        }
      }
    }
  )
);


exports.deleteMessageMedia = async (req,res,next) => {
    await Messagemedia.findOne({ where: { id: req.params.id }})
    .then(message => {
      if (message.dataValues.imageUrl === null) {
        return Messagemedia.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'publication deleted.'}))
        .catch(error => res.status(400).json({ error }));
      } else {
      const filename = message.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, async () => {
        return Messagemedia.destroy({ where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'publication deleted.'}))
      .catch(error => res.status(400).json({ error }))});
      }
    })
    .catch(error => res.status(500).json({ error }));
}