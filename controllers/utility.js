const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const utilityDAO = require('../dao/UtilityDAO')

router.post('/new-client', (req, res) => {
    utilityDAO.new_client(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router