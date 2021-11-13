const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const clientModel = require('./../model/ClientModel')
const _config = require('./../config/app.json')

const initDAO = {

    create: (param, callback) => {
        var error = []
        if (!param.name)error.push('Name is required')
        if (!param.email)error.push('Email is required')
        if (!param.password)error.push('Password is required')
        
        if (error.length == 0) {
            const data = {name:param.name, email:param.email, password:Util.get_hash(param.password),
                          phone:param.phone, access:param.access, product_type:param.product, 
                          logo:param.logo, website:param.website, address:param.address, status:param.status}
            clientModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:"Could not save data."}))
                else
                    return callback(Resp.success({msg:"Client successfully added.", resp:resp}))
            })
        } else
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    update: (param, callback) => {
        var error = []
        var data = {}
        if (!param.identity)error.push('Provide Identity')
        if (param.name)data.name = param.name
        if (param.email)data.email = param.email
        if (param.password)data.password = Util.get_hash(param.password)
        if (param.phone)data.phone = param.phone
        if (param.access)data.access = param.access
        if (param.product)data.product_type = param.product
        if (param.logo)data.logo = param.logo
        if (param.address)data.address = param.address
        if (param.website)data.website = param.website
        if (param.status)data.status = param.status

        if (error.length == 0) {
            if (data) {
                clientModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id)
                        return callback(Resp.error({msg:"something went wrong updating data..."}))
                    else
                        return callback(Resp.success({msg:"Client successfully updated.", resp:resp}))
                })
            } else 
                return callback(Resp.error({msg:"No changes detected."}))
        } else  
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    by_identity: (identity, callback) => {
        clientModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error) 
                return callback(Resp.success({msg:"Data found", resp:state}))
            else 
                return callback(Resp.error({msg:"No data found", resp:null}))
        })
    },

    pull: (param, callback) => {
        clientModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    del: (param, callback) => {
        var error = []
        if (!param.identity)error.push('Provide identity')

        if (error.length == 0) {
            clientModel.del(param.identity, (resp) => {
                if (resp)
                    return callback(Resp.success({msg:"Data successfully deleted."}))
                else
                    return callback(Resp.error({msg:"Error in deleting data"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    administrative_login: (param, callback) => {
        var error = []
        if (!param.email)error.push('Provide client email')
        if (!param.password)error.push('Password is required')

        if (error.length == 0) {
            clientModel.findOne({conditions:{email:param.email}}, (user) => {
                if (user){
                    const match = Util.check_password(param.password, user.password)
                    if (match && user.status == 1) {
                        const token = Util.generate_token({id:user._id,role:user.access,email:user.email})
                        return callback(Resp.success({msg:"logged in", resp:token}))
                    } else
                        return callback(Resp.error({msg:"Invalid Credentials"}))
                }
                else 
                    return callback(Resp.error({msg:"User not found"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    reset_pass: (param, callback) => {
        const error = []
        if (!param.email)error.push('Email is required')

        if (error.length == 0) {
            clientModel.findOne({conditions:{email:param.email}}, (user) => {
                if (!user)
                    return callback(Resp.error({msg:"User does not exist"}))
                else {
                    const {sendMail} = require('./../libraries/Mailer')
                    const {reset} = require('./../templates/Messages')
                    sendMail({email:user.email, subject:_config.reset_msg, message:reset(user)}, (msg) => {
                        if (msg && msg.id)
                            return callback(Resp.success({msg:"Please, check your mailbox for password reset link"}))
                        else
                            return callback(Resp.error({msg:"Email service is unavailable"}))
                    })
                }
            })
        } else {
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
        }
    }
}

module.exports = initDAO