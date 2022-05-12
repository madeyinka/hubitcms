const express = require('express'),router = express.Router()
const Util = require('./../libraries/Utility')
const authDAO = require('./../dao/AuthDAO')
const { authenticate } = require('../middlewares')

router.post('/login', authDAO.handleLogin)

router.post('/reset', (req, res) => {
    authDAO.reset(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/update', (req, res) => {
    authDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router