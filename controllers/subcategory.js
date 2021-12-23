const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const subcategoryDAO = require('./../dao/SubcategoryDAO')
const { authenticate } = require('../middlewares')

router.post('/create', authenticate, (req, res) => {
    const user = req.userInfo
    subcategoryDAO.create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', authenticate, (req, res) => {
    subcategoryDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', authenticate, (req, res) => {
    subcategoryDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', authenticate, (req, res) => {
    const user = req.userInfo
    subcategoryDAO.pull(req.query, user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', authenticate, (req, res) => {
    subcategoryDAO.del(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router