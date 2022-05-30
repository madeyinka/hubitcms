const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const urlSlug = require('url-slug')
const groupModel = require('./../model/GroupModel')
const serviceModel = require('./../model/ServiceModel')

const initDAO = {

    create: (param, user, callback) => {
        const error = []
        if (!param.name)error.push('Service name is required')

        if (error.length === 0) {
            const data = {name:param.name, slug:(param.slug ? param.slug : urlSlug(param.name)), description:param.description,
            icon:param.icon, group_id:param.group_id, group_name:param.group_name, image:param.image, client_id:user.id, 
            status:param.status}
            serviceModel.save(data, (resp) => {
                if (!resp._id)
                    return callback(Resp.error({msg:'Could not save data', resp:null}))
                else
                    return callback(Resp.success({msg:"Service successfully added.", resp:resp}))
            })
        } else
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    update: (param, user, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push('Provide Identity')
        if (param.name)data.name = param.name
        if (param.slug)data.slug = (param.slug ? param.slug : urlSlug(param.name))
        if (param.icon)data.icon = param.icon
        if (param.description)data.description = param.description
        if (param.group_id)data.group_id = param.group_id
        if (param.group_name)data.group_name = param.group_name
        if (param.image)data.image = param.image
        if (param.meta_title)data.meta_title = param.meta_title
        if (param.meta_description)data.meta_description = param.meta_description
        if (param.meta_keywords)data.meta_keywords = unique(param.meta_keywords.replace(" ","").split(","))
        data.status = param.status
        data.client_id = user.id

        if (error.length === 0) {
            if (data) {
                serviceModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:"Something went wrong updating data...", resp:null}))
                    } else {
                        return callback(Resp.success({msg:"Success successfully updated", resp:resp}))
                    }
                })
            }
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))

    },

    by_identity: (identity, callback) => {
        serviceModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error) 
                return callback(Resp.success({msg:"Data found", resp:state}))
            else 
                return callback(Resp.error({msg:"No data found", resp:null}))
        })
    },

    pull: (param, user, callback) => {
        param.client_id = user
        serviceModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    fetch_all: (param, callback) => {
        serviceModel.findAll(Util.param_filter(param), (state) => {
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
            serviceModel.del(param.identity, (resp) => {
                if (resp)
                    return callback(Resp.success({msg:"Data successfully deleted."}))
                else
                    return callback(Resp.error({msg:"Error in deleting data"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    group_create: (param, user, callback) => {
        const error = []
        if (!param.name)error.push('Provide name for group')

        if (error.length === 0) {
            const data = {name:param.name, slug:(param.slug ? param.slug : urlSlug(param.name)), 
                        description:param.description, client_id:user.id, status:param.status}
            groupModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:'Could not save data', resp:null}))
                else 
                    return callback(Resp.success({msg:"New group successfully added.", resp:resp}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    group_update: (param, user, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push('Provide identity for group')
        if (param.name)data.name = param.name
        if (param.slug)data.slug = (param.slug ? param.slug : urlSlug(param.name))
        if (param.description)data.description = param.description
        client_id = user.id, data.status = param.status

        if (error.length === 0) {
            if (data) {
                groupModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:"something went wrong updating data...", resp:nul}))
                    } else
                        return callback(Resp.success({msg:'Content successfully updated.', resp:resp}))
                })
            }
        } else  
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    group_by_identity: (identity, callback) => {
        groupModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error)
                return callback(Resp.success({msg:"Data found", resp:state}))
            else 
                return callback(Resp.error({msg:"No data found", resp:null}))
        })
    },

    group_pull: (param, user, callback) => {
        param.client_id = user
        groupModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },
    
    group_del: (param, callback) => {
        const error = []
        if (!param.identity)error.push('Provide identity')

        if (error.length == 0) {
            groupModel.del(param.identity, (resp) => {
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