const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const fb = require('./../libraries/Facebook') 
const clientModel = require('./../model/ClientModel')

const initDAO = {

    fb_token: (param, user, callback) => { 
        const error = []
        if (!param.app_id)error.push('Provide App ID for facebook')
        if (!param.app_secret)error.push('Provide App Secret for facebook')
        if (!param.page_id) error.push('Provide Page ID for facebook')
        if (!param.token)error.push('Provide access token for facebook')

        if (error.length == 0) {
            const data = {app_id:param.app_id, app_secret:param.app_secret, page_id:param.page_id, token:param.token}
            fb.get_token(data, (result) => {
            if (result && result.status) { 
                clientModel.update(result.token, {_id:user.id}, () => {
                    return callback(Resp.success({msg:result.msg}))
                })
            } else
                return callback(Resp.error(result.msg))
            })
        } else
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    publish_fb: (identity, user, callback) => { 
        clientModel.findOne({conditions:{_id:user.id}}, (userInfo) => {
            const contentModel = require('./../model/ContentModel')
            contentModel.findOne({conditions:{_id:identity}}, (data) => {
                if (!userInfo.fb_token || !userInfo.fb_page_id){
                    return callback({msg:"Configuration error", status:false})
                } else {
                    if (data.fb_postid == "") {
                        const dataObj = {id:userInfo.fb_page_id, token:userInfo.fb_token, msg:data.short_content, link:data.link}
                        fb._publish(dataObj, (response) => {
                            if (response && response.id) {
                                contentModel.update({fb_postid:response.id}, {_id:identity}, (state) =>{
                                    if (state && !state.error) {
                                        return callback({msg:"Content Published", status:true})
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
    },

    del_fb: (identity, user, callback) => {
        clientModel.findOne({conditions:{_id:user.id}}, (userInfo) => {
            const contentModel = require('./../model/ContentModel')
            contentModel.findOne({conditions:{_id:identity}}, (data) => {
                const dataObj = {id:data.fb_postid, token:userInfo.fb_token}
                fb._unpublish(dataObj, (response) => {
                    if (response) {
                        contentModel.update({fb_postid:""}, {_id:identity}, (resp) => {
                            if (resp._id) {
                                return callback({status:true})
                            }
                        })
                    }
                })
            })
        })
    }
}

module.exports = initDAO