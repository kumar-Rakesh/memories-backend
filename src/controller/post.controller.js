const mongoose = require('mongoose')
const Post = require('../mongoose/model/post.model')
const User = require('../mongoose/model/user.model')

const getPost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await Post.findById(id).populate({ path: 'creator', select: 'name' }).exec()
        return res.status(200).json({ data: post })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

const getPosts = async (req, res) => {
    const { page } = req.query
    try {
        const LIMIT = 8
        const startIndexToSkip = (Number(page) - 1) * LIMIT
        const totalDocuments = await Post.count({})

        const posts = await Post.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndexToSkip)
            .populate({ path: 'creator', select: 'name' })
            .exec()
        return res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(totalDocuments / LIMIT) })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

const findPosts = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        const title = new RegExp(searchQuery, 'i')
        const posts = await Post.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] }).populate({ path: 'creator', select: 'name' }).exec()
        return res.status(200).json({ data: posts })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: 'No post found with required query' })
    }
}

const addPost = async (req, res) => {
    if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' })
    const postRequest = req.body
    const postMessage = new Post({ ...postRequest, creator: req.userId })
    try {
        const savedPostMessage = await postMessage.save()
        const postWithCreatorName = await Post.findById(savedPostMessage._id).populate({ path: 'creator', select: 'name' }).exec()
        return res.status(201).json(postWithCreatorName)
    } catch (err) {
        console.log(err)
        res.status(409).json({ message: err.message })
    }
}

const updatePost = async (req, res) => {
    if (!req.userId)
        return res.status(401).json({ message: 'Unauthenticated' })
    const { id: _id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: 'Post Id not found!' })
    try {
        const existingPost = await Post.findById(_id)
        if (existingPost.creator.toString() !== req.userId) return res.status(401).json({ message: 'Unauthorized' })
        const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, _id: _id }, { new: true }).populate({ path: 'creator', select: 'name' }).exec()
        return res.status(201).json(updatedPost)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const deletePost = async (req, res) => {
    if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' })
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: 'Post Id not found!' })
    try {
        await Post.findByIdAndDelete(_id)
        return res.status(200).json({ message: 'Post deleted successfully!' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const likePost = async (req, res) => {
    if (!req.userId) return res.status(401).json({ message: 'Unauthenticated' })
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: 'Post Id not found!' })
    try {
        const post = await Post.findById(_id)
        const index = post.likes.findIndex(id => id === String(req.userId))
        if (index == -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }
        const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true }).populate({ path: 'creator', select: 'name' }).exec()
        return res.status(200).json(updatedPost)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getPost, getPosts, findPosts, addPost, updatePost, deletePost, likePost }