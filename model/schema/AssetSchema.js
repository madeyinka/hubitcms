const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    url:{type:String, default:""},
    type:{type:String, default:""},
    format:{type:String, default:""},
    size:{type:Number, default:""},
    width:{type:Number},
    height:{type:Number},
    client_id:{type:String, default:""},
    status:{type:Number, default:1},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.asset, SchemaDef)
module.exports = modelInit