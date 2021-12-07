var Base = require('./BaseModel')
var schemaInit = require('./schema/PageSchema')

var modelInit = Base.extend('PageModel', {
    init: function(){
        this._super(schemaInit,"PAGE");
    }
})
module.exports = new modelInit()