const express = require('express')
const cors = require('cors')
const connectdb = require('./mongoose/mongoose')
const postRoutes = require('./routes/post.routes')
const authRoutes = require('./routes/auth.routes')
const commentRoutes = require('./routes/comment.routes')
const serverless = require('serverless-http')

const app = express()
app.use(cors())
app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use('/posts', postRoutes)
app.use('/posts/auth', authRoutes)
app.use('/posts', commentRoutes)

app.use('/', (req, res) => {
    res.json('Welcome to Memories App')
})

connectdb()

module.exports.handler = serverless(app)
