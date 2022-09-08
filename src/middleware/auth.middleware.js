const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')

const validateToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1]
        if (accessToken) {
            const isCustomAuth = accessToken.length < 500
            console.log(accessToken.length)
            let decoded;
            if (isCustomAuth) {
                decoded = jwt.verify(accessToken, config.ACCESS_TOKEN.SECRET)
                req.userId = decoded?.id
            } else {
                decoded = jwt.decode(accessToken)
                req.userId = decoded?.sub
            }
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

module.exports = validateToken
