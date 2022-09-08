const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../mongoose/model/user.model')
const config = require('../config/auth.config')

const signUp = async (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body
    try {

        const existingUser = await User.findOne({ email })

        if (existingUser)
            return res.status(400).send({ message: 'Email already in use' })

        if (password !== confirmPassword)
            return res.status(400).send({ message: 'Password and Confirm Password do not match' })

        const user = new User({
            name: `${firstName} ${lastName}`,
            email: email,
            password: await bcrypt.hashSync(password, config.ROUNDS)
        })

        const savedUser = await user.save()

        const accessToken = jwt.sign(
            {
                id: savedUser._id, email: email
            },
            config.ACCESS_TOKEN.SECRET,
            {
                expiresIn: config.ACCESS_TOKEN.EXPIRES_IN
            }
        )
        return res.status(201).send({ result: savedUser, token: accessToken })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Internal Server Error' })
    }


}

const signIn = async (req, res) => {

    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser)
            return res.status(404).send({ message: 'User not found!' })

        const isPasswordCorrect = await bcrypt.compareSync(password, existingUser.password)

        if (!isPasswordCorrect)
            return res.status(401).send({ message: 'Invalid password!' })

        const accessToken = jwt.sign(
            {
                id: existingUser._id, email: email
            },
            config.ACCESS_TOKEN.SECRET,
            {
                expiresIn: config.ACCESS_TOKEN.EXPIRES_IN
            }
        )
        return res.status(200).json({ result: existingUser, token: accessToken })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

const signOut = async (req, res) => {
    try {
        req.session = null
        return res.status(200).json({ message: 'You have been signed out' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = { signUp, signIn, signOut }