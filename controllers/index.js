const express = require('express')
const router = express.Router()
const _config = require('./../config/app.json')

const api_url = _config.app_base+_config.api._url+_config.api._version

router.use(api_url+'/auth', require('./auth'))
router.use(api_url+'/assets', require('./assets'))
router.use(api_url+'/client', require('./client'))
router.use(api_url+'/page', require('./page'))
router.use(api_url+'/category', require('./category'))
router.use(api_url+'/subcategory', require('./subcategory'))
router.use(api_url+'/service', require('./service'))
// router.use(api_url+'/gallery', require('./gallery'))
router.use(api_url+'/content', require('./content'))
router.use(api_url+'/settings', require('./settings'))
router.use(api_url+'/contact', require('./contact'))
router.use(api_url+'/refresh', require('./refresh'))
router.use(api_url+'/utility', require('./utility'))

module.exports = router