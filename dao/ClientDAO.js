const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const clientModel = require('./../model/ClientModel')
const _config = require('./../config/app.json')
const { sendMail } = require('./../libraries/Mailer')

const initDAO = {

    create: (param, callback) => {
        const error = []
        if (!param.firstname)error.push('First Name is required')
        if (!param.lastname)error.push('Last Name is required')
        if (!param.email)error.push('Email is required')
        if (!param.company)error.push('Company name is required')
        if (!param.website)error.push('Website is required')
        if (!param.product)error.push('Select an option for platform')
        
        if (error.length == 0) {
            const data = {
                fname:param.firstname,
                lname:param.lastname,
                email:param.email,
                phone:param.phone, 
                product_type:param.product, 
                sector:param.sector,
                role:param.role,
                password:Util.get_hash(param.firstname),
                passkey:Util.rand_str(15),
                company:param.company, 
                website:param.website, 
                address:param.address,
                state:param.state,
                lga:param.lga,
                status:param.status,
                publish:param.publish,
                logo:param.logo        
            }
            
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
        if (param.firstname)data.fname = param.firstname
        if (param.lastname)data.lname = param.lastname
        if (param.email)data.email = param.email
        if (param.phone)data.phone = param.phone
        if (param.access)data.access = param.access
        if (param.sector)data.sector = param.sector
        if (param.role)data.role = param.role
        if (param.product)data.product_type = param.product
        if (param.logo)data.logo = param.logo
        if (param.avatar)data.avatar = param.avatar
        if (param.address)data.address = param.address
        if (param.lga)data.lga = param.lga
        if (param.state)data.state = param.state
        if (param.country)data.country = param.country
        if (param.language)data.language = param.language
        if (param.website)data.website = param.website 
        if (param.company)data.company = param.company
        if (param.title)data.site_title = param.title
        if (param.description)data.site_desc = param.description
        if (param.facebook)data.facebook = param.facebook
        if (param.twitter)data.twitter = param.twitter
        if (param.instagram)data.instagram = param.instagram
        if (param.linkedln)data.linkedln = param.linkedln
        if (param.fb_page_id)data.fb_page_id = param.fb_page_id
        if (param.fb_token)data.fb_token = param.fb_token
        if (param.passkey)data.passkey = param.passkey
        data.status = param.status
        data.publish = param.publish

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
    }
}

module.exports = initDAO