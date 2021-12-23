const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const subcategoryModel = require('./../model/SubcategoryModel')
const urlSlug = require('url-slug')

const initDAO = {

    create: (param, user, callback) => {
        const error = []
        if (!param.label)error.push('Label is required')
        if (!param.category)error.push('Please select a category')

        if (error.length == 0) {
            const data = {
                label:param.label,
                slug:urlSlug(param.label),
                category:param.category,
                description:param.description,
                client_id:user.id,
                status:param.status
            }
            subcategoryModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:"Could not save data.", resp:null}))
                else
                    return callback(Resp.success({msg:"Category successfully added.", resp:resp}))  
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    update: (param, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push('Provide Identity')
        if (param.label)data.label = param.label
        if (param.label)data.slug = urlSlug(param.label)
        if (param.category)data.category = param.category
        if (param.description)data.description = param.description
        if (param.status)data.status = param.status

        if (error.length == 0) {
            if (data) {
                subcategoryModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:"something went wrong updating data..."}))
                    } else 
                        return callback(Resp.success({msg:"Page successfully updated.", resp:resp}))
                })
            }
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    by_identity: (identity, callback) => {
        subcategoryModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error) 
                return callback(Resp.success({msg:"Data found", resp:state}))
            else 
                return callback(Resp.error({msg:"No data found", resp:null}))
        })
    },

    pull: (param, user, callback) => {
        param.client_id = user.id
        subcategoryModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    del: (param, callback) => {
        const error = []
        if (!param.identity)error.push('Provide identity')

        if (error.length == 0) {
            subcategoryModel.del(param.identity, (resp) => {
                if (resp)
                    return callback(Resp.success({msg:"Data successfully deleted."}))
                else
                    return callback(Resp.error({msg:"Error in deleting data"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    }
}

module.exports = initDAO