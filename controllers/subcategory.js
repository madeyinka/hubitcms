const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const subcategoryDAO = require('./../dao/SubcategoryDAO')

router.post('/create', (req, res) => {
    subcategoryDAO.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    subcategoryDAO.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    subcategoryDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', (req, res) => {
    subcategoryDAO.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    subcategoryDAO.del(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router