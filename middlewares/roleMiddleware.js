const jwt = require('jsonwebtoken')
const {
    secret
} = require('../config')
const path = require('path')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const cookies = req.cookies
            const token = cookies.token
            if (!token) {
                return res.redirect('/signup')
            }
            const {
                roles: userRoles
            } = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({
                    message: 'No access'
                })
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({
                message: 'The user is not logged in'
            })
        }
    }
}