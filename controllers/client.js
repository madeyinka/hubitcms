const express = require('express'),router = express.Router()
const Util = require('./../libraries/Utility')
const clientDAO = require('./../dao/ClientDAO')
const authenticator = require('../middlewares/authenticator')

router.post('/create', (req, res) => {
    clientDAO.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', authenticator, (req, res) => {
    const user = req.userInfo._id
    clientDAO.update(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', authenticator, (req, res) => {
    const user = req.userInfo._id
    clientDAO.by_identity(user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', authenticator, (req, res) => {
    clientDAO.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    clientDAO.del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router