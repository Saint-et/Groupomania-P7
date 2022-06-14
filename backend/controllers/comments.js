const Comments = require('../models/comments');
const { models } = require('../db/mysql');


exports.getAllCommentsPost = async (req,res,next) => (
    await Comments.findAll({order: [
        ['updatedAt', 'DESC']],
        attributes: ['id','comment','userId','postId','createdAt'], include: [models.users, models.post]})
      .then(message => {
          return  res.status(200).json({ message })
      })
)

exports.postOneCommentsPost = async (req,res,next) => {
    try {
        const comment = Comments.build({
            comment: req.body.comment,
            userId: req.body.userId,
            postId: req.body.postId
        })
    
        comment.save()
        .then(() => res.status(201).json({ message: 'New comment created.' }))
        .catch(error => res.status(400).json({ error }));
    } catch (error) {
        return (error => res.status(500).json({ error }));
    }
}

exports.getOneCommentsPost = async (req,res,next) => (
    console.log('bonjour')
)

exports.getAllCommentsPostByUser = async (req,res,next) => (
    console.log('bonjour')
)

exports.updateCommentsPost = async (req,res,next) => (
    console.log('bonjour')
)

exports.deleteCommentsPost = async (req,res,next) => (
    console.log('bonjour')
)