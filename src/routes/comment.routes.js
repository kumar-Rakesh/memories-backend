const express = require('express')
const { addComment, getComments } = require('../controller/comment.controller')
const validateToken = require('../middleware/auth.middleware')
const router = express.Router()

router.get('/:id/comment', getComments)
router.post('/:id/comment', validateToken, addComment)

module.exports = router