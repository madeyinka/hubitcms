var Base = require('./BaseModel')
var schemaInit = require('./schema/ClientSchema')

var modelInit = Base.extend('ClientModel', {
    init: function(){
        this._super(schemaInit,"CLIENT");
    }
})
module.exports = new modelInit()