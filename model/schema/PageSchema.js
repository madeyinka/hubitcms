const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    title:{type:String, default:""},
    slug:{type:String, default:""},
    content:{type:String, default:""},
    keywords:{type:[String], default:[]},
    description:{type:String, default:""},
    client_id:{type:String, default:""},
    status:{type:Number, default:1},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.page, SchemaDef)
module.exports = modelInit