const _config = require('./../config/app.json')

const FB = {

    get_token: (data, callback) => {
        const url = _config.fb.long_token.replace("[APP-ID]", data.app_id).replace("[APP-SECRET]", data.app_secret).replace("[SHORT-TOKEN]", data.token)
        const unirest = require('unirest')
        unirest.get(url)
        .end((response) => {
            if (response) {
                const obj = response.body
                if (obj && !obj.error) {
                    const payload = {id:data.page_id, token:obj.access_token}
                    Fb.page_token(payload, (token) => {
                        return callback({token:token, msg:"Configuartion settings saved!", status:true})
                    })
                } else 
                    return callback({msg:"Error encountered", status:false})
            }else
                return callback({msg:"Failure in connection", status:false})
        })
    },

    page_token: (data, callback) => {
        const url = _config.fb.page_token.replace("[PAGE-ID]", data.id).replace("[LONG-TOKEN]", data.token)
        const unirest = require('unirest')
        unirest.get(url)
        .end((response) => {
            const obj = JSON.parse(response.body)
            const result = {fb_token:obj.access_token, fb_page_id:obj.id}
            return callback(result)
        })
    },

    _publish: (params, callback) => { //return post_id if successful
        const url = _config.fb.publish_post.replace("[PAGE-ID]", params.id)
        const postData = {message:params.msg, link:params.link, access_token:params.token}
        const unirest = require('unirest')
        unirest.post(url)
        .field(postData)
        .end((response) => {
            if (response) {
                return callback(JSON.parse(response.body))
            }
        })
    },

    _unpublish: (params, callback) => {
        const url = _config.fb.delete_post.replace("[PAGE-POST-ID]", params.id)
                                          .replace("[PAGE-TOKEN]", params.token)
        const unirest = require('unirest')
        // console.log(url)
        unirest.delete(url)
        .end((response) => {
            if (response) 
                return callback(JSON.parse(response.body))
        })

    }
    
}

module.exports = FB