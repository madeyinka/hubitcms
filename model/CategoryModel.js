var Base = require('./BaseModel')
var schemaInit = require('./schema/CategorySchema')

var modelInit = Base.extend('CategoryModel', {
    init: function(){
        this._super(schemaInit,"CATEGORY");
    }
})
module.exports = new modelInit()