const express = require('express'),router = express.Router()
const Util = require('./../libraries/Utility')
const settingsDAO = require('./../dao/SettingsDAO')
const { authenticate } = require('../middlewares')

router.post('/fb-token', authenticate, (req, res) => {
    const user = req.userInfo
    settingsDAO.fb_token(Util.param_extract(req), user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/fb-publish', authenticate, (req, res) => {
    const user = req.userInfo
    settingsDAO.publish_fb(req.query.identity, user, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/fb-delete', authenticate, (req, res) => {
    const user = req.userInfo
    settingsDAO.del_fb(req.query.identity, user, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router