var Base = require('./BaseModel')
var schemaInit = require('./schema/ContentSchema')

var modelInit = Base.extend('ContentModel', {
    init: function(){
        this._super(schemaInit,"CONTENT");
    }
})
module.exports = new modelInit()