const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    name: {type:String, unique:true, default:""},
    email: {type:String, unique:true, default:""},
    password: {type:String, default:""},
    access: {type:String, enum:["0101", "0103"], default:"0101"},
    product_type:{type:String, default:""},
    phone:{type:String, default:""},
    passkey:{type:String, default:""},
    company:{type:String, default:""},
    address:{type:String, default:""},
    website:{type:String, default:""},
    logo:{type:String, default:""},
    site_title:{type:String, default:""},
    site_desc:{type:String, default:""},
    status:{type:Number, default:1},
    publish:{type:Boolean, default:true},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.client, SchemaDef)
module.exports = modelInit