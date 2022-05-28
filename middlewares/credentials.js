const whiteListed = require('../config/whitelist')

const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if (whiteListed.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials