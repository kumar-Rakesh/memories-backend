const { Schema, model } = require('mongoose')
const User = require('./user.model')

const schema = new Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = model("Post", schema)

module.exports = Post