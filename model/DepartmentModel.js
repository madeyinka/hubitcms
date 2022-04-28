var Base = require('./BaseModel')
var schemaInit = require('./schema/DepartmentSchema')

var modelInit = Base.extend('DepartmentModel', {
    init: function(){
        this._super(schemaInit,"DEPARTMENT");
    }
})
module.exports = new modelInit()