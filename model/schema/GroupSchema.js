const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    name:{type:String, default:""},
    slug:{type:String, default:""},
    description:{type:String, default:""},
    client_id:{type:String, default:""},
    status:{type:Boolean, default:true},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.group, SchemaDef)
module.exports = modelInit