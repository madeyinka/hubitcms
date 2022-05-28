const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema({
    fname: {type:String, default:""},
    lname:{type:String, default:""},
    email:{type:String, default:""},
    phone:{type:String, default:""},
    password:{type:String, required:true},
    avatar:{type:String, default:""},
    passkey:{type:String, default:""},
    company:{type:String, default:""},
    address:{type:String, default:""},
    position:{type:String, default:""},
    sector:{type:String, default:""},
    plan:{type:String, enum:["Basic", "Standard", "Custom"]},
    country:{type:String, default:""},
    state:{type:String, default:""},
    state_alias:{type:String, default:""},
    lga:{type:String, default:""},
    logo:{type:String, default:""},
    facebook:{type:String, default:""},
    twitter:{type:String, default:""},
    instagram:{type:String, default:""},
    linkedln:{type:String, default:""},
    website:{type:String, default:""},
    site_title:{type:String, default:""},
    site_desc:{type:String, default:""},
    roles:{user:{type:Number, default:1900}, manager:Number, admin:Number},
    fb_token:{type:String, default:""},
    fb_page:{type:String, default:""},
    refresh_token:{type:String, default:""},
    publish:{type:Boolean, default:false},
    status:{type:Boolean, deafult:false},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.client, SchemaDef)
module.exports = modelInit

