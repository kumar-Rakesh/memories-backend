const mongoose = require('mongoose')
const Post = require('../mongoose/model/post.model')
const User = require('../mongoose/model/user.model')
const Comment = require('../mongoose/model/comment.model')

const getComments = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: 'Post Id not found!' })
    try {
        const comments = await Comment.find({ post: id })
            .populate({ path: 'creator', select: 'name' })
            .sort({ _id: -1 })
            .exec()
        return res.status(200).json(comments)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

const addComment = async (req, res) => {
    if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' })
    const { comment } = req.body
    if (comment?.length == 0) return res.status(400).json({ message: 'Bad Request' })
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: 'Post Id not found!' })
    const commentMessage = new Comment({ comment: comment, post: id, creator: req.userId })
    try {
        const savedComment = await commentMessage.save()
        const savedCommentWithCreator = await Comment.findById(savedComment._id)
            .populate({ path: 'creator', select: 'name' })
            .exec()
        return res.status(200).json(savedCommentWithCreator)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { getComments, addComment }