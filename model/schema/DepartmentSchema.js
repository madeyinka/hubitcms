const mongoose = require('mongoose')
const _config = require('../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    name:{type:String, default:""},
    email:{type:String, default:""},
    client_id:{type:String, default:""},
    status:{type:Boolean, default:true},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.department, SchemaDef)
module.exports = modelInit