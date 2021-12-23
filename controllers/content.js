const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const contentDAO = require('./../dao/ContentDAO')
const { authenticate } = require('../middlewares')

router.post('/create', authenticate, (req, res) => {
    const user = req.userInfo
    contentDAO.create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', authenticate, (req, res) => {
    const user = req.userInfo
    contentDAO.update(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', authenticate, (req, res) => {
    contentDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', authenticate, (req, res) => {
    const user = req.userInfo
    contentDAO.pull(req.query, user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', authenticate,(req, res) => {
    contentDAO.del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router