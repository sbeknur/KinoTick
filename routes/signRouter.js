const express = require('express')
const router = express.Router()
const path = require('path')
const controller = require('../controllers/authController')

router
    .route('/')
    .get((req, res) => res.render(path.resolve('views/signup.ejs'), {
        title: 'Sign',
    }))

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/logout', controller.logout)
module.exports = router