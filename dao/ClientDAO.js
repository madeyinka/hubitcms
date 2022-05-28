const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const clientModel = require('./../model/ClientModel')

const initDAO = {

    create: (param, callback) => {
        const error = []
        if (!param.firstname)error.push('First Name is required')
        if (!param.lastname)error.push('Last Name is required')
        if (!param.email)error.push('Email is required')
        if (!param.password)error.push('Password is required')
        if (!param.company)error.push('Company name is required')
        if (!param.website)error.push('Website is required')
        if (!param.plan)error.push('Select an option for platform')
        
        if (error.length == 0) {
            const data = {
                fname:param.firstname,
                lname:param.lastname,
                email:param.email,
                phone:param.phone, 
                plan:param.plan, 
                sector:param.sector,
                position:param.position,
                roles:param.role,
                password:Util.get_hash(param.password),
                passkey:Util.rand_str(15),
                company:param.company, 
                website:param.website, 
                address:param.address,
                country:param.country,
                state:param.state,
                state_alias:param.state_alias,
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

    update: (param, user, callback) => {
        const error = []
        let data = {}
        if (param.firstname)data.fname = param.firstname
        if (param.lastname)data.lname = param.lastname
        if (param.email)data.email = param.email
        if (param.phone)data.phone = param.phone
        if (param.position)data.position = param.position
        if (param.sector)data.sector = param.sector
        if (param.role)data.roles = param.role
        if (param.plan)data.plan = param.plan
        if (param.logo)data.logo = param.logo
        if (param.avatar)data.avatar = param.avatar
        if (param.address)data.address = param.address
        if (param.lga)data.lga = param.lga
        if (param.state)data.state = param.state
        if (param.state_alias)data.state_alias = param.state_alias
        if (param.country)data.country = param.country
        if (param.website)data.website = param.website 
        if (param.company)data.company = param.company
        if (param.title)data.site_title = param.title
        if (param.description)data.site_desc = param.description
        if (param.facebook)data.facebook = param.facebook
        if (param.twitter)data.twitter = param.twitter
        if (param.instagram)data.instagram = param.instagram
        if (param.linkedln)data.linkedln = param.linkedln
        if (param.fb_page)data.fb_page = param.fb_page
        if (param.fb_token)data.fb_token = param.fb_token
        if (param.refresh_token)data.refresh_token = param.refresh_token
        if (param.passkey)data.passkey = param.passkey
        data.status = param.status; data.publish = param.publish

        if (error.length == 0) {
            if (data) {
                clientModel.update(data, {_id:user}, (resp) => {
                    if (!resp._id)
                        return callback(Resp.error({msg:"something went wrong updating data..."}))
                    else
                        return callback(Resp.success({msg:"Client successfully updated.", resp:resp}))
                })
            } else 
                return callback(Resp.error({msg:"No change detected."}))
        } else  
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    by_identity: (user, callback) => {
        clientModel.findOne({conditions:{_id:user}}, (state) => {
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