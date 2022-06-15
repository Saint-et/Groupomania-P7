const Comments = require('../models/comments');
const { models } = require('../db/mysql');


exports.getAllCommentsPost = async (req,res,next) => (
    await Comments.findAll({order: [
        ['createdAt', 'DESC']],
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

exports.updateCommentsPost = async (req,res,next) => (
    await Comments.update({ comment: req.body.comment }, {where : { id: req.params.id }})
    .then(() => res.status(200).json({ message: 'Comment changed' }))
    .catch(error => res.status(400).json({ error }))
)

exports.deleteCommentsPost = async (req,res,next) => (
    await Comments.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Comment deleted.'}))
        .catch(error => res.status(400).json({ error }))
)