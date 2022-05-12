const express = require('express')
const router = express.Router()
const path = require('path')
const http = require('http')
const filmModel = require('../models/filmModel')


let currency
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