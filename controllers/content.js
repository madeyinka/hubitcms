const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const contentDAO = require('./../dao/ContentDAO')

router.post('/create', (req, res) => {
    contentDAO.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    contentDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    contentDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', (req, res) => {
    contentDAO.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    contentDAO.del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router