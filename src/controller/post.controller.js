const mongoose = require('mongoose')
const Post = require('../mongoose/model/post.model')

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

const addPost = async (req, res) => {
    const postRequest = req.body
    const postMessage = new Post(postRequest)
    try {
        await postMessage.save()
        res.status(201).json(postMessage)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

const updatePost = async (req, res) => {
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: 'Post Id not found!' })
    try {
        const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id: _id }, { new: true })
        res.status(201).json(updatedPost)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deletePost = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: 'Post Id not found!' })
    try {
        await Post.findByIdAndDelete(_id)
        res.status(200).json({ message: 'Post deleted successfully!' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const likePost = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: 'Post Id not found!' })
    try {
        const post = await Post.findById(_id)
        const updatedPost = await Post.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true })
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getPosts, addPost, updatePost, deletePost, likePost }