var Base = require('./BaseModel')
var schemaInit = require('./schema/GroupSchema')

var modelInit = Base.extend('GroupModel', {
    init: function(){
        this._super(schemaInit,"GROUP");
    }
})
module.exports = new modelInit()