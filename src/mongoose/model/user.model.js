const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const User = model("User", schema)

module.exports = User