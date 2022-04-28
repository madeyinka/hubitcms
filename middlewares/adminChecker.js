const jwt = require('jsonwebtoken')
const User = require('../model/ClientModel')
const dotenv = require('dotenv')

const adminChecker = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) res.status(403).send("Forbidden for Non Authorized User")

    const token = authHeader && authHeader.replace("Bearer", "").trim()

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    User.findOne({conditions:{_id:decoded.id}}, (user) => {
        if (!user || user.access !== "0105") res.status(401).send("Access Denied for Unauthorized User")
        else {
            req.userInfo = user
            next()
        }
    })
}

module.exports = adminChecker