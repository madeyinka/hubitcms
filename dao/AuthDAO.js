const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const _config = require('./../config/app.json')
const clientModel = require('./../model/ClientModel')
const { sendMail } = require('./../libraries/Mailer')

const initAuth = {

    handleLogin: (req, res) => {
        const {email, password} = req.body
        if (!email || !password) return res.status(400).json({msg:"Invalid Credentials"})

        //check if user exists
        clientModel.findOne({conditions:{email:email}}, (user) => {
            if (user) { 
                //check password match if user exists
                if (Util.check_password(password, user.password)){ 
                    //check if user status is active
                    if (user.status) {
                        const roles = Object.values(user.roles).filter(Boolean)
                        const payload = {id:user._id, username:user.fname, roles:roles}
                        const accessToken = Util.access_token(payload)
                        const refreshToken = Util.refresh_token(payload)
                        clientModel.update({refresh_token:refreshToken}, {_id:user._id}, (state) => {
                            if (state._id){
                                //set http cookie
                                res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
                                res.status(200).json({msg:"Login Successful", response:{payload, accessToken}})
                            }
                        })
                    } else {
                        return res.status(403).json({msg:"Contact Administrator"})
                    }
                } else {
                    return res.status(400).json({msg:"Invalid Credentials"})
                }
            } else {
                return res.status(400).json({msg:"Invalid Credentials"})
            }
        })
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