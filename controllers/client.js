const express = require('express'),router = express.Router()
const Util = require('./../libraries/Utility')
const clientDAO = require('./../dao/ClientDAO')
const adminChecker = require('../middlewares/adminChecker')

router.post('/create', (req, res) => {
    clientDAO.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    clientDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    clientDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', (req, res) => {
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