const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const pageDAO = require('./../dao/PageDAO')
const authenticator = require('../middlewares/authenticator')

router.post('/create', authenticator, (req, res) => {
    const user = req.userInfo
    pageDAO.create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    pageDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    pageDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', (req, res) => {
    pageDAO.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    pageDAO.del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router