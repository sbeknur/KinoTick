const User = require('../models/userModel')
const Role = require('../models/roleModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    validationResult
} = require('express-validator')
const {
    secret
} = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {
        expiresIn: '12h'
    })
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Registration error',
                    errors
                })
            }
            const username = req.body.regName
            const email = req.body.regEmail
            const password = req.body.regPassword

            const candidate = await User.findOne({
                email
            })
            if (candidate) {
                return res.status(400).json({
                    message: 'A user with this name already exists'
                })
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({
                value: 'USER'
            })
            const user = new User({
                username: username,
                email: email,
                password: hashPassword
            })
            await user.save()
            return res.redirect('/')
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Registration error'
            })
        }
    }

    async login(req, res) {
        try {
            const email = req.body.logEmail
            const password = req.body.logPassword
            const user = await User.findOne({
                email
            })
            if (!user) {
                return res.status(400).json({
                    message: `User with email ${email} not found`
                })
            }
            user.roles.forEach(role => {
                if (role === 'ADMIN') {
                    res.cookie('isAdmin', true, {
                        httpOnly: true
                    })
                }
            })
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({
                    message: 'Invalid password'
                })
            }
            const token = generateAccessToken(user._id, user.roles)
            res.cookie('isAuth', true, {
                httpOnly: true
            })
            res.cookie('token', token, {
                httpOnly: true
            })
            return res.redirect('/')
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Login error'
            })
        }
    }
    async logout(req, res) {
        res.cookie('token', '', {
            maxAge: 1
        })
        res.cookie('isAuth', false, {
            httpOnly: true
        })
        res.cookie('isAdmin', false, {
            httpOnly: true
        })
        res.redirect('/')
    }
}


module.exports = new authController()