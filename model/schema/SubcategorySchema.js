const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    label:{type:String, default:""},
    slug:{type:String, default:""},
    category_id:{type:String, default:""},
    category_label:{type:String, default:""},
    description:{type:String, default:""},
    client_id:{type:String, default:""},
    status:{type:Boolean, default:true},
    del_flag:{type:Number, default:0}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.subcategory, SchemaDef)
module.exports = modelInit