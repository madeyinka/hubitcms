const express = require('express')
const router = express.Router()
const _config = require('./../config/app.json')

const api_url = _config.app_base+_config.api._url+_config.api._version

router.use(api_url+'/assets', require('./assets'))
router.use(api_url+'/client', require('./client'))
router.use(api_url+'/utility', require('./utility'))
router.use(api_url+'/page', require('./page'))
router.use(api_url+'/category', require('./category'))
router.use(api_url+'/subcategory', require('./subcategory'))
router.use(api_url+'/content', require('./content'))

module.exports = router