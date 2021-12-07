var Base = require('./BaseModel')
var schemaInit = require('./schema/CategorySchema')

var modelInit = Base.extend('SubcategoryModel', {
    init: function(){
        this._super(schemaInit,"SUBCATEGORY");
    }
})
module.exports = new modelInit()