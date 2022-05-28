const express = require('express'), router = express.Router()
const clientModel = require('../model/ClientModel')
const jwt = require('jsonwebtoken')
const Util = require('../libraries/Utility')
const authenticator = require('../middlewares/authenticator')

router.get('/', (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(403)
    const refreshToken = cookies.jwt

    clientModel.findOne({conditions:{refresh_token:refreshToken}}, (user) => {
        if (user) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err || user.username !== decoded.username) 
                    return res.sendStatus(403)

                const roles = Object.values(user.roles).filter(Boolean)
                const payload = {id:decoded.id, username:decoded.username, roles:roles}
                const accessToken = Util.access_token(payload)
                return res.json({payload, accessToken})
            })
        } else {
            return res.sendStatus(403)
        }
    })  
})

module.exports = router