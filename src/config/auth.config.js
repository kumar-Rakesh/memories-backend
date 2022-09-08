const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, "../config/.env") })

module.exports = {
    ACCESS_TOKEN: {
        SECRET: process.env.ACCESS_TOKEN_SECRET,
        EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN // 5 Mins
    },
    REFRESH_TOKEN: {
        SECRET: process.env.REFRESH_TOKEN_SECRET,
        EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN // 5 Mins
    },
    ROUNDS: Number.parseInt(process.env.HASH_ROUNDS)
}
