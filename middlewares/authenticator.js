const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const User = require('../model/ClientModel')

const authenticator = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization4
    if (!authHeader) res.status(403).send("Forbidden for Non Authorized User")

    const token = authHeader && authHeader.replace("Bearer", "").trim()

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).send("Invalid Token")
        User.findOne({conditions:{_id:decoded.userObj.id}}, (user) => {
            if (!user) return res.status(403).send("Access Denied for Unauthorized User")
            req.userInfo = user
            next()
        })
    })

    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // User.findOne({conditions:{_id:decoded.id}}, (user) => {
    //     if (!user) res.status(401).send("Access Denied for Unauthorized User")
    //     else {
    //         req.userInfo = user
    //         next()
    //     }
    // })
    
}

module.exports = authenticator