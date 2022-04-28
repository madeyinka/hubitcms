var Base = require('./BaseModel')
var schemaInit = require('./schema/ServiceSchema')

var modelInit = Base.extend('ServiceModel', {
    init: function(){
        this._super(schemaInit,"SERVICE");
    }
})
module.exports = new modelInit()