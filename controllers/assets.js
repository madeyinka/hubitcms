const express = require('express'), router = express.Router(),
fs = require('fs'), _config = require('./../config/app.json'),
upload = require('./../libraries/Multer'), Util = require('./../libraries/Utility'),
Resp = require('./../dao/Response'), cloudinary = require('./../libraries/Cloudinary'),
assetModel = require('./../model/AssetModel'), {authenticate} = require('./../middlewares')

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

router.post('/upload-single', upload.single('file'), authenticate, async(req, res) => {
    const location = _config.default_folder
    if (req.query && req.query.location) location = req.query.location
    const uploader = async (path) => await cloudinary.uploads(path, location)
    const {path} = req.file
    const {result} = await uploader(path)
    if (result){
        const data = {url:result.url,type:result.resource_type,format:result.format,size:Number((result.bytes/1024).toFixed(2)),width:result.width,height:result.height,client_id:req.userInfo._id}
        assetModel.save(data, function(){})
        res.status(200).json({data:result.url})
    }
    else 
        res.status(401).json({msg:"Error Uploading File"})
})

router.post('/upload-to-cloud', upload.array('files'), authenticate, async (req, res) => {
    const results = [], files = req.files
    const location = _config.default_folder
    if (req.query && req.query.location) location = req.query.location
    const uploader = async (path) => await cloudinary.uploads(path, location)
    if (req.method === 'POST') {
    
        for (const file of files) {
            const {path} = file
            const newPath = await uploader(path)
            results.push(newPath.result)
            fs.unlinkSync(path)
        }
        results.forEach(function(result){
            const data = {
                url:result.url,
                type:result.resource_type,
                format:result.format,
                size:Number((result.bytes/1024).toFixed(2)),
                width:result.width,
                height:result.height,
                client_id:req.userInfo._id
            }
            assetModel.save(data, ()=>{})
        })
    
        res.status(200).json({
            data: results
        })
    } else
        res.status(401).json({msg:"Invalid method"})
})

router.get('/', authenticate, (req, res) => {
    const param = {client_id:req.userInfo._id}
    assetModel.findAll(param, (result) => {
        if (!result.error) {
            Util.resp(res).json(Resp.success({msg: "",resp:result}))
        } else
            Util.resp(res).json(Resp.error({msg:"No result found", resp:null}))
    })
})

router.get('/by-identity', (req, res) => {
    assetModel.findOne({conditions:{_id:req.query.identity}}, (state) => {
        if (!state.error) {
            Util.resp(res).json(Resp.success({msg: "",resp:state}))
        } else 
            Util.resp(res).json(Resp.error({msg:"No result found", resp:null}))
    })
})

router.get('/delete', (req, res) => {
    const error = []
    if (!req.query.identity)error.push('Provide identity')

    if (error.length == 0) {
        assetModel.del(req.query.identity, (resp) => {
            if (resp)
                Util.resp(res).json(Resp.success({msg:"Data successfully deleted."}))
            else
                Util.resp(res).json(Resp.error({msg:"Error in deleting data"}))
        })
    } else
        Util.resp(res).json(Resp.error({msg:"Inavalid Parameter"}))
})


module.exports = router