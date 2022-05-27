const express = require('express')
const router = express.Router()
const filmModel = require('../models/filmModel')
const path = require('path')
const http = require('http')

router
    .route('/')
    .get(async (req, res) => {
        const film = await filmModel.find()
        res.render(path.resolve('views/index.ejs'), {
            activePage: 'index',
            film: film,
        })
    })

module.exports = router