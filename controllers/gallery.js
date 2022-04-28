const express = require('express'), router = express.Router()
const Util = require('../libraries/Utility')
const galleryDAO = require('./../dao/GalleryDAO')
const authenticator = require('../middlewares/authenticator')

router.post('/create', (req, res) => {

})

router.post('/modify', (req, res) => {

})

router.get('/by-identity', (req, res) => {

})

router.get('/pull', (req, res) => {

})

router.get('/delete', (req, res) => {

})

router.post('/category/create', (req, res) => {

})

router.post('/category/modify', (req, res) => {

})

router.get('/category/by-identity', (req, res) => {

})

router.get('/category/pull', (req, res) => {

})

router.get('category/delete', (req, res) => {
    
})

module.exports = router