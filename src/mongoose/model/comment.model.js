const { Schema, model } = require('mongoose')

const schema = new Schema({
    comment: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        requird: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requird: true
    },
    createdAt: {
        type: Date,
        default: new Date().toISOString()
    }
})

const Comment = model("Comment", schema)

module.exports = Comment