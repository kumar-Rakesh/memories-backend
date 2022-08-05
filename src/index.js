const express = require('express')
const cors = require('cors')
const connectdb = require('./mongoose/mongoose')
const postRoutes = require('./routes/post.routes')

const app = express()
app.use(cors())
app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use('/posts', postRoutes)

connectdb(app)
