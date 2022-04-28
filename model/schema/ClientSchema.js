const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    fname: {type:String, default:""},
    lname: {type:String, default:""},
    email: {type:String, unique:true, default:""},
    password: {type:String, default:""},
    access: {type:String, enum:["0101", "0103", "0105"], default:"0103"},
    product_type:{type:String, default:""},
    phone:{type:String, default:""},
    passkey:{type:String, default:""},
    company:{type:String, default:""},
    sector:{type:String, default:""},
    role:{type:String, default:""},  //Job title
    address:{type:String, default:""},
    lga:{type:String, default:""},
    state:{type:String, default:""},
    country:{type:String, default:""},
    website:{type:String, default:""},
    logo:{type:String, default:""},
    avatar:{type:String, default:""},
    language:{type:String, default:""},
    site_title:{type:String, default:""},
    site_desc:{type:String, default:""},
    facebook:{type:String, default:""},
    twitter:{type:String, default:""},
    instagram:{type:String, default:""},
    linkedln:{type:String, default:""},
    fb_token:{type:String, default:""},
    fb_page_id:{type:String, default:""},
    status:{type:Boolean, default:false},
    publish:{type:Boolean, default:false},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.client, SchemaDef)
module.exports = modelInit