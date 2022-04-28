const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    title:{type:String, default:""},
    slug:{type:String, default:""},
    category_id:{type:String, default:""},
    category_label:{type:String, default:""},
    subcategory_id:{type:String, default:""},
    subcategory_label:{type:String, default:""},
    type:{type:String, default:""},
    media_link:{type:String, default:""},
    featured:{type:Boolean, default:false},
    short_content:{type:String, default:""},
    content:{type:String, default:""},
    cover_img:{type:String, default:""},
    thumb_img:{type:String, default:""},
    keywords:{type:Array, default:[]},
    meta_title:{type:String, default:""},
    meta_keywords:{type:[String], default:[]},
    meta_description:{type:String, default:""},
    link:{type:String, default:""},
    author:{type:String, default:""},
    fb_postid:{type:String, default:""},
    pub_date:{type:Date, default:Date.now},
    client_id:{type:String, default:""},
    status:{type:Boolean, default:false},
    fb_status:{type:Boolean, deafult:false},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.content, SchemaDef)
module.exports = modelInit