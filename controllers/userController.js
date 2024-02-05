const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'please fill all data'
            })
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'email already exist'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({ username, email, password: hashedPassword })
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'User registerd successfully',
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'error in registration',
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: 'please provide email or password'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'email not exist'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'invalid username or password'
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        return res.status(200).send({
            success: true,
            message: 'login successfully',
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'error in login',
        })
    }
}

module.exports = { registerUser, loginUser }