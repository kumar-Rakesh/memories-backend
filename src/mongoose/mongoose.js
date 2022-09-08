const { connect, connection } = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

const connectdb = () => {

    dotenv.config({ path: path.join(__dirname, "../config/.env") })

    const URI = process.env.DB_URI

    connect(URI, null)

    connection.once('open', () => console.log('Connection Open!!'))

}

module.exports = connectdb