const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const categoryDAO = require('./../dao/CategoryDAO')
const { authenticate } = require('../middlewares')

router.post('/create', authenticate, (req, res) => {
    const user = req.userInfo
    categoryDAO.create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', authenticate, (req, res) => {
    const user = req.userInfo
    categoryDAO.update(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', authenticate, (req, res) => {
    categoryDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', authenticate, (req, res) => {
    const user = req.userInfo
    categoryDAO.pull(req.query, user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', authenticate, (req, res) => {
    categoryDAO.del(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router