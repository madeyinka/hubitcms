const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const clientModel = require('./../model/ClientModel')
const _config = require('./../config/app.json')
const { sendMail } = require('./../libraries/Mailer')

const initDAO = {

    create: (param, callback) => {
        const error = []
        if (!param.name)error.push('Name is required')
        if (!param.email)error.push('Email is required')
        if (!param.company)error.push('Company name is required')
        if (!param.website)error.push('Website is required')
        
        if (error.length == 0) {
            const data = {name:param.name,email:param.email,phone:param.phone, access:param.access, product_type:param.product, 
                          password:Util.get_hash(param.name+"@2021"),passkey:Util.rand_str(15),company:param.company, site_title:param.title, 
                          site_desc:param.description, logo:param.logo, website:param.website, address:param.address, status:param.status, publish:param.publish}
            
            clientModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:"Could not save data.", resp:null}))
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
        if (param.phone)data.phone = param.phone
        if (param.access)data.access = param.access
        if (param.product)data.product_type = param.product
        if (param.logo)data.logo = param.logo
        if (param.address)data.address = param.address
        if (param.website)data.website = param.website
        if (param.status)data.status = param.status
        if (param.company)data.company = param.company
        if (param.title)data.site_title = param.title
        if (param.description)data.site_desc = param.description
        if (param.passkey)data.passkey = param.passkey
        if (param.fb)data.fb_keys = param.fb
        if (param.publish)data.publish = param.publish

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
                        const token = Util.generate_token({id:user._id})
                        return callback(Resp.success({msg:"logged in", resp:token}))
                    } else
                        return callback(Resp.error({msg:"Invalid Credentials"}))
                }
                else 
                    return callback(Resp.error({msg:"User does not exist"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    reset_pass: (param, callback) => {
        const error = [], option = {}
        if (!param.email)error.push('Email is required')

        if (error.length == 0) {
            clientModel.findOne({conditions:{email:param.email}}, (user) => {
                if (!user)
                    return callback(Resp.error({msg:"User does not exist"}))
                else {
                    option.email = user.email
                    option.subject = _config.reset_msg
                    option.message = {name:user.name, link:_config.reset_link+'?identity='+user._id+'&key='+user.passkey}
                    sendMail(option, 'reset', (msg) => {
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
    },

    pass_update: (param, callback) => {
        const error = []
        if (!param.identity)error.push('Provide identity')
        if (!param.password)error.push('Password is required')

        if (error.length == 0) {
            clientModel.findOne({conditions:{_id:param.identity}}, (user) => {
                if (Util.compare_param(user.passkey, param.key)){
                    const data = {password:Util.get_hash(param.password), passkey:Util.rand_str(15)}
                    clientModel.update(data, {_id:param.identity}, (state) => {
                        if (state && !state.error) 
                            return callback(Resp.success({msg:"Password updated successfully"}))
                        else
                            return callback(Resp.error({msg:"Error Updating record"}))
                    })
                } else 
                    return callback(Resp.error({msg:"Invalid Link", resp:null}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    }
}

module.exports = initDAO