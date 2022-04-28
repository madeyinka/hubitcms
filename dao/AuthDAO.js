const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const _config = require('./../config/app.json')
const clientModel = require('./../model/ClientModel')
const { sendMail } = require('./../libraries/Mailer')

const initAuth = {

    login: (param, callback) => {
        var error = []
        if (!param.email)error.push('Provide client email')
        if (!param.password)error.push('Password is required')

        if (error.length == 0) {
            clientModel.findOne({conditions:{email:param.email}}, (user) => {
                if (user){
                    const match = Util.check_password(param.password, user.password)
                    if (match && user.status) {
                        const token = Util.generate_token({id:user._id})
                        const userInstance = {
                            id:user._id,
                            firstname:user.fname,
                            lastname:user.lname,
                            website:user.website,
                            isAdmin:user.access === '0105'? true : false,
                            product:user.product_type,
                            isAuthenticated:true,
                            token:token
                        }
                        return callback(Resp.success({msg:"user Logged in", resp:userInstance}))
                    } else
                        return callback(Resp.error({msg:"Invalid Credentials"}))
                }
                else 
                    return callback(Resp.error({msg:"User does not exist"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    reset: (param, callback) => {
        const error = [], option = {}
        if (!param.email)error.push('Email is required')

        if (error.length == 0) {
            clientModel.findOne({conditions:{email:param.email}}, (user) => {
                if (!user)
                    return callback(Resp.error({msg:"User does not exist"}))
                else {
                    option.email = user.email
                    option.subject = _config.reset_msg
                    option.message = {name:user.name, link:_config.reset_link+'/'+user._id+'/'+user.passkey}
                    sendMail(option, 'reset', (msg) => {
                        if (msg && msg.id)
                            return callback(Resp.success({msg:"Check your mailbox for reset link"}))
                        else
                            return callback(Resp.error({msg:"Email service is unavailable"}))
                    })
                }
            })
        } else {
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
        }
    },

    update: (param, callback) => {
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

module.exports = initAuth