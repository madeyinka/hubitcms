const express = require('express'), router = express.Router()
const fs = require('fs')
const _config = require('./../config/app.json')
const upload = require('./../libraries/Multer')
const Util = require('./../libraries/Utility')
const Resp = require('./../dao/Response')
const cloudinary = require('./../libraries/Cloudinary')

router.post('/upload', (req, res) => {
    const location = _config.asset_folder
    if (req.query && req.query.location) location = './'+req.query.location
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, location)
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() +'_'+ file.originalname);
        }
    })
    const upload = multer({storage:storage}).single('files')
    upload(req, res, (err) => {
        if (err)
            Util.resp(res).json(Resp.error({msg: "Error uploading file.",resp:err}))
        else 
            Util.resp(res).json(Resp.success({msg:"File Uploaded Successfully",resp:req.file}))
    })
})

router.post('/upload-single', upload.single('file'), async(req, res) => {
    const location = _config.default_folder
    if (req.query && req.query.location) location = req.query.location
    const uploader = async (path) => await cloudinary.uploads(path, location)
    const {path} = req.file
    const result = await uploader(path)
    if (result)
        res.status(200).json({data:result.url})
    else 
        res.status(401).json({msg:"Error Uploading File"})
})

router.post('/upload-to-cloud', upload.array('files'), async (req, res) => {
    const location = _config.default_folder
    if (req.query && req.query.location) location = req.query.location
    const uploader = async (path) => await cloudinary.uploads(path, location)
    if (req.method === 'POST') {
        const urls = [], files = req.files
        for (const file of files) {
            const {path} = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        res.status(200).json({
            data: urls
        })
    } else
        res.status(401).json({msg:"Invalid method"})
})



module.exports = router