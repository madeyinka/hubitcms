const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    name:{type:String, default:""},
    slug:{type:String, default:""},
    description:{type:String, default:""},
    icon:{type:String, default:""},
    group_id:{type:String, default:""},
    group_name:{type:String, default:""},
    image:{type:String, default:""},
    client_id:{type:String, default:""},
    status:{type:Boolean, default:false},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.service, SchemaDef)
module.exports = modelInit