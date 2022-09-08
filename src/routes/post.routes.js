const express = require('express')
const { getPosts, addPost, updatePost, deletePost, likePost, findPosts, getPost } = require('../controller/post.controller')
const validateToken = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/', getPosts)
router.get('/search', findPosts)
router.get('/:id', getPost)
router.post('/', validateToken, addPost)
router.patch('/:id', validateToken, updatePost)
router.delete('/:id', validateToken, deletePost)
router.patch('/:id/like', validateToken, likePost)

module.exports = router