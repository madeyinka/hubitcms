var Base = require('./BaseModel')
var schemaInit = require('./schema/ContactSchema')

var modelInit = Base.extend('ContactModel', {
    init: function(){
        this._super(schemaInit,"CONTACT");
    }
})
module.exports = new modelInit()