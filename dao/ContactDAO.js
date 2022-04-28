const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const contactModel = require('../model/ContactModel')
const departmentModel = require('../model/DepartmentModel')
const _config = require('./../config/app.json')
const { sendMail } = require('./../libraries/Mailer')

const initDAO = {

    create: (param, callback) => {
        const error = []
        if (!param.sender)error.push('Provider sender identity')
        if (!param.subject)error.push('Provide Subject for message')
        if (!param.email)error.push('Sender email is required')

        if (error.length === 0) {
            const data = {sender:param.sender, email:param.email, subject:param.subject, unit_name:param.unit_name, 
                           unit_email:param.unit_email, client_id:param.client_id, message:param.message}
            contactModel.save(data, (resp) => {
                if (!resp._id) {
                    return callback(Resp.error({msg:'Could not save data', resp:null}))
                } else {
                    const option = {email:resp.unit_email, subject:resp.subject, message:resp.message}
                    sendMail(option, 'contact', (msg) => {
                        if (msg && msg.id) 
                            return callback(Resp.success({msg:'Message sent successfully', resp:resp}))
                        else 
                            return callback(Resp.success({msg:'Message sent successfully.', resp:resp}))
                    })
                }
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    by_identity: (identity, callback) => {
        contactModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error) {
                return callback(Resp.success({msg:'Data Found', resp:state}))
            } else {
                return callback(Resp.error({msg:'No data found', resp:null}))
            }
        })
    },

    pull: (param, callback) => {
        contactModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:'Data Found', resp:state}))
            } else 
                return callback(Resp.error({msg:'No data found', resp:null}))
        })
    },

    del: (param, callback) => {
        const error = []
        if (!param.identity)error.push('Provide Identity')

        if (error.length === 0) {
            contactModel.del(param.identity, (resp) => {
                if (resp)
                    return callback(Resp.success({msg:'Record deleted.'}))
                else
                    return callback(Resp.error({msg:'Error in deleting data"'}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    },

    create_unit: (param, user, callback) => {
        const error = []
        if (!param.name)error.push('Provide a name for unit')
        if (!param.email)error.push('Provide email for unit')

        if (error.length === 0) {
            const data = {name:param.name, email:param.email, client_id:user.id}
            departmentModel.save(data, (resp) => {
                if (!resp._id) {
                    return callback(Resp.error({msg:'Could not save data', resp:null}))
                } else 
                    return callback(Resp.success({msg:'New Unit added', resp:resp}))
            })
        } else  
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    }, 

    update_unit: (param, user, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push('Provide identity')
        if (param.name)data.name = param.name
        if (param.email)data.email = param.email
        if (user)data.client_id = user.id

        if (error.length === 0) {
            if (data) {
                departmentModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:'Could not update data', resp:null}))
                    } else 
                        return callback(Resp.success({msg:'Unit successfully updated', resp:resp}))
                })
            }
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    }, 

    unit_by_identity: (identity, callback) => {
        departmentModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error)
                return callback(Resp.success({msg:'Data Found', resp:state}))
            else 
                return callback(Resp.error({msg:'No data found', resp:null}))
        })
    },

    unit_pull: (param, callback) => {
        departmentModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:'Data Found', resp:state}))
            } else 
                return callback(Resp.error({msg:'No data found', resp:null}))
        })
    },

    unit_del: (param, callback) => {
        const error = []
        if (!param.identity)error.push('Provide Identity')

        if (error.length === 0) {
            departmentModel.del(param.identity, (resp) => {
                if (resp)
                    return callback(Resp.success({msg:'Record deleted.'}))
                else
                    return callback(Resp.error({msg:'Error in deleting data"'}))
            })
        } else 
            return callback(Resp.error({msg:'Invalid Parameter', resp:error}))
    }

}

module.exports = initDAO