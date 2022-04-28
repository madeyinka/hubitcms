const mongoose = require('mongoose')
const _config = require('../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    sender:{type:String, default:""},
    email:{type:String, default:""},
    unit_name:{type:String, default:""},
    unit_email:{type:String, default:""},
    subject:{type:String, default:""},
    message:{type:String, default:""},
    client_id:{type:String, default:""},
    status:{type:Boolean, default:true},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.contact, SchemaDef)
module.exports = modelInit