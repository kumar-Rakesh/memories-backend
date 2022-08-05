const express = require('express')
const { getPosts, addPost, updatePost, deletePost, likePost } = require('../controller/post.controller')
const router = express.Router()

router.get('/', getPosts)
router.post('/', addPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/like', likePost)

module.exports = router