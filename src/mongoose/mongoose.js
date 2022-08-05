const { connect, connection } = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

const connectdb = (app) => {

    dotenv.config({ path: path.join(__dirname, "../config/.env") })

    const URI = process.env.DB_URI
    const PORT = process.env.PORT || 5000

    connect(URI, null)

    connection.once('open', () => console.log('Connection Open!!'))

    app.listen(PORT, () => console.log(`Server started listening on ${PORT}`))
}

module.exports = connectdb