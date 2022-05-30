const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const serviceDAO = require('./../dao/ServiceDAO')
const authenticator = require('../middlewares/authenticator')

router.post('/create', authenticator, (req, res) => {
    const user = req.userInfo
    serviceDAO.create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', authenticator, (req, res) => {
    const user = req.userInfo
    serviceDAO.update(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    serviceDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', authenticator, (req, res) => {
    const user = req.userInfo.id
    serviceDAO.pull(req.query, user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    serviceDAO.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/group/create', authenticator, (req, res) => {
    const user = req.userInfo
    serviceDAO.group_create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/group/modify', authenticator, (req, res) => {
    const user = req.userInfo
    serviceDAO.group_update(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/group/by-identity', (req, res) => {
    serviceDAO.group_by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/group/pull', authenticator, (req, res) => {
    const user = req.userInfo.id
    serviceDAO.group_pull(req.query, user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/group/delete', (req, res) => {
    serviceDAO.group_del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

/** Consumption Route */
router.get('/all-services', (req, res) => {
    serviceDAO.fetch_all(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router