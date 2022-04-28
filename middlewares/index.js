const jwt = require('jsonwebtoken')
const clientModel = require('./../model/ClientModel')
const dotenv = require('dotenv').config()

const init = {

    authenticate: (req, res, next) => {
        if (!req.headers.authorization) {
            res.status(401).json({message: "Authorization required"})
        }
        let splitHeader = req.headers.authorization.split(' ')
        if (splitHeader[0] !== 'Bearer') {
            res.status(401).json({message: "Invalid token format"})
        }
        let token = splitHeader[1];
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                res.status(403).json({message:"Token is invalid or expired"})
            }
            else{
                clientModel.findOne({conditions:{_id:decoded.id}}, (user) => {
                    if (!user) throw new Error()
                    req.userInfo = user
                    next()
                })
            }
        })
    }
}

module.exports = init
