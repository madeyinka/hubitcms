const _config = require('./../config/app.json')
const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const { sendMail } = require('./../libraries/Mailer')

const initDAO = {
    new_client: (param, callback) => {
        const error = []
        if (!param. firstname)error.push('Firstname is required')
        if (!param. lastname)error.push('Lastname is required')
        if (!param. email)error.push('Email is required')
        if (!param. password)error.push('Password is required')

        if (error.length === 0) {
            const data = {
                fname: param.firstname,
                lname: param.lastname,
                email: param.email,
                password: Util.get_hash(param.password),
                company: param.company,
                plan: param.plan,
                phone: param.phone
            }
            const clientModel = require('../model/ClientModel') //check if user already exists...
            clientModel.save(data, (resp) => {
                if (resp && resp._id) {
                    const userOption = {email:resp.email, subject:_config.confirm_user, message:{}}
                    sendMail(userOption, 'welcome', (mssg) => {
                        const adminOption = {email:"mustytryst@gmail.com", subject:_config.new_user_alert, message:{}}
                        sendMail(adminOption, 'new-user', (msg) => {
                            if (msg && msg.id) {
                                return callback(Resp.success({msg:"Success! Please check your mailbox to proceed", resp:resp}))
                            }
                        })
                    })
                } else {
                    return callback(Resp.error({msg:"Could not save data.", resp:null}))
                }
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))



    }
}

module.exports = initDAO