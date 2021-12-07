const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const _config = require('./../config/app.json')
const pageModel = require('./../model/PageModel')
const urlSlug = require('url-slug')

const initDAO = {

    create: (param, callback) => {
        const error = []
        if (!param.title)error.push('Provide title for page')

        if (error.length == 0) {
            const data = {title:param.title, slug:urlSlug(param.title), content:param.content, keywords:param.keywords, 
                description:param.description, client_id:req.userInfo.id, status:param.status}
                pageModel.save(data, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:"Could not save data."}))
                    } else
                    return callback(Resp.success({msg:"Page successfully added.", resp:resp}))
                })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    modify: (param, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push('Provide identity')
        if (param.title)data.title = param.title
        if (param.title)data.slug = urlSlug(param.title)
        if (param.content)data.content = param.content
        if (param.keywords)data.keywords = param.keywords
        if (param.description)data.description = param.description
        if (param.status)data.status = param.status

        if (error.length == 0) {
            if (data) {
                pageModel.update(data, {_id:param.identity}, (resp) => {
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
        pageModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error) 
                return callback(Resp.success({msg:"Data found", resp:state}))
            else 
                return callback(Resp.error({msg:"No data found", resp:null}))
        })
    },

    pull: (param, callback) => {
        pageModel.findAll((Util.param_filter(param)), (state) => {
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
            pageModel.del(param.identity, (resp) => {
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