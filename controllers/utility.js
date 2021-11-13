const express = require('express'),router = express.Router()
const Util = require('./../libraries/Utility')

router.post('/admin-login', (req, res) => {
    const clientDAO = require('./../dao/ClientDAO')
    clientDAO.administrative_login(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/forgot-password', (req, res) => {
    const clientDAO = require('./../dao/ClientDAO')
    clientDAO.reset_pass(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})


module.exports = router