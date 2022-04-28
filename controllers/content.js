const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const contentDAO = require('./../dao/ContentDAO')
const authenticator = require('../middlewares/authenticator')

router.post('/create', authenticator, (req, res) => {
    const user = req.userInfo
    contentDAO.create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', authenticator, (req, res) => {
    const user = req.userInfo
    contentDAO.update(Util.param_extract(req), user, (state) => {
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

router.get('/delete', authenticator, (req, res) => {
    contentDAO.del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/category/create', authenticator, (req, res) => {
    const user = req.userInfo
    contentDAO.category_create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/category/modify', authenticator, (req, res) => {
    const user = req.userInfo
    contentDAO.category_update(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/category/by-identity', (req, res) => {
    contentDAO.category_by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/category/pull', (req, res) => {
    contentDAO.category_pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/category/delete', (req, res) => {
    contentDAO.category_del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/subcategory/create', authenticator, (req, res) => {
    const user = req.userInfo
    contentDAO.subcategory_create(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/subcategory/modify', authenticator, (req, res) => {
    const user = req.userInfo
    contentDAO.subcategory_update(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/subcategory/by-identity', (req, res) => {
    contentDAO.subcategory_by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/subcategory/pull', (req, res) => {
    contentDAO.subcategory_pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/subcategory/delete', (req, res) => {
    contentDAO.subcategory_del(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router