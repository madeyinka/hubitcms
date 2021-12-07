const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const categoryDAO = require('./../dao/CategoryDAO')

router.post('/create', (req, res) => {
    categoryDAO.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    categoryDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    categoryDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', (req, res) => {
    categoryDAO.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    categoryDAO.del(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router