const { redirect } = require('express/lib/response');
const Message = require('../models/message');

require("uuid")

exports.getAllMessage = async (req,res,next) => {
    Message.findAll({attributes: ['fromUser','titleMessage','contentMessage']})
    .then(message => {
        return  res.status(200).json({ message })
    })
}

exports.getOneMessage = async (req,res,next) => {
    await Message.findOne({ where: { messageId: req.params.messageId }})
    .then(message => {
        return res.status(200).json({ message })
    })
}

exports.postOneMessage = async (req,res,next) => {
    try {
        let generate_Message_ID = Math.floor(Math.random() * 500000 * 500000)
        const message = Message.build({
            messageId: generate_Message_ID,
            fromUser: req.body.fromUser,
            titleMessage: req.body.titleMessage,
            contentMessage: req.body.contentMessage
        })
        message.save()
            .then(() => res.status(201).json({ message: 'New message created.' }))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        return (error => res.status(500).json({ error }));
    }
    
}

exports.updateMessage = async (req,res,next) => {
    await Message.findOne({ where: { messageId: req.params.messageId }})
    .then(message => {
        message.set({
            titleMessage: req.body.titleMessage,
            contentMessage: req.body.contentMessage
          });

          message.save(message.dataValues);
          return res.status(200).json({ message: 'Message changed', message })
    })
}

exports.deleteMessage = async (req,res,next) => {
    await Message.destroy({ where: { messageId: req.params.messageId }})
      .then(() => res.status(200).json({ message: 'Message deleted.'}))
      .catch(error => res.status(400).json({ error }));
}