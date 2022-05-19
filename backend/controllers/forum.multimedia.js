const { redirect } = require('express/lib/response');
const Messagemedia = require('../models/forummedia');

require("uuid");

exports.getAllMessageMedia = async (req,res,next) => (
    Messagemedia.findAll({attributes: ['titleMessage','imageMessage','videoMessage']})
    .then(message => {
        return  res.status(200).json({ message })
    })
);

exports.getOneMessageMedia = async (req,res,next) => (
    await Messagemedia.findOne({ where: { messageId: req.params.messageId }})
    .then(message => {
        return res.status(200).json({ message });
    })
);

exports.postOneMessageMedia = async (req,res,next) => {
    try {
        let generate_Message_ID = Math.floor(Math.random() * 500000 * 500000);

        const message = Messagemedia.build({
            messageId: generate_Message_ID,
            titleMessage: req.body.titleMessage,
            imageMessage: req.body.imageMessage,
            videoMessage: req.body.videoMessage
        })
        message.save()
            .then(() => res.status(201).json({ message: 'New message created.' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        return (error => res.status(500).json({ error }));
    }
    
}

exports.updateMessageMedia = async (req,res,next) => (
    await Messagemedia.findOne({ where: { messageId: req.params.messageId }})
    .then(message => {
        message.set({
           titleMessage: req.body.titleMessage,
           imageMessage: req.body.imageMessage,
           videoMessage: req.body.videoMessage
        });

          message.save(message.dataValues);
          return res.status(200).json({ message: 'Message changed', message })
    })
);

exports.deleteMessageMedia = async (req,res,next) => {
    await Messagemedia.destroy({ where: { messageId: req.params.messageId }})
      .then(() => res.status(200).json({ message: 'Message deleted.'}))
      .catch(error => res.status(400).json({ error }));
}