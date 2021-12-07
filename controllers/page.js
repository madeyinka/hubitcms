const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const pageDAO = require('./../dao/PageDAO')
const { authenticate } = require('../middlewares')

router.post('/create', authenticate, (req, res) => {
    pageDAO.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', authenticate, (req, res) => {
    pageDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', authenticate, (req, res) => {
    pageDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', authenticate, (req, res) => {
    pageDAO.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', authenticate, (req, res) => {
    pageDAO.del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router