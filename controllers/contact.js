const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const contactDAO = require('./../dao/ContactDAO')
const authenticator = require('../middlewares/authenticator')

router.post('/unit/create', authenticator, (req, res) => {
    const user = req.userInfo
    contactDAO.create_unit(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/unit/modify', authenticator, (req, res) => {
    const user = req.userInfo
    contactDAO.update_unit(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/unit/by-identity', (req, res) => {
    contactDAO.unit_by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})


router.get('/unit/pull', (req, res) => {
    contactDAO.unit_pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/unit/delete', (req, res) => {
    contactDAO.unit_del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/create', (req, res) => {
    contactDAO.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

// router.post('/modify', authenticator, (req, res) => {
//     const user = req.userInfo
//     contactDAO.update(Util.param_extract(req), user, (state) => {
//         Util.resp(res).json(state)
//     })
// })

router.get('/by-identity', (req, res) => {
    contactDAO.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', (req, res) => {
    contactDAO.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/delete', (req, res) => {
    contactDAO.del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router