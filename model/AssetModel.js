var Base = require('./BaseModel')
var schemaInit = require('./schema/AssetSchema')

var modelInit = Base.extend('AssetModel', {
    init: function(){
        this._super(schemaInit,"ASSET");
    }
})
module.exports = new modelInit()