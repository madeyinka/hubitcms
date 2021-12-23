const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const unique = require('array-unique')
const contentModel = require('./../model/ContentModel')
const urlSlug = require('url-slug')

const initDAO = {

    create: (param, user, callback) => {
        const error = []
        if (!param.title)error.push('Provide title for content')
        if (!param.category)error.push('Select a category')
        if (!param.type)error.push('Select a type for content')

        if (error.length == 0) {
            const data = {title:param.title, slug:urlSlug(param.title), category:param.category, subcategory:param.subcategory, type:param.type,
            media_link:param.media, featured:param.featured, short_content:param.short_content, content:param.content, cover_img:param.cover_img,
            link:param.link, thumb_img:param.thumb_img, author:param.author, meta_title:param.meta_title,meta_description:param.meta_description, 
            client_id:user._id, status:param.status}
            if (param.pub_date)data.pub_date = Util.date_time(param.pub_date)
            if (param.keywords)data.keywords = unique(param.keywords.replace(" ","").split(","))
            if (param.meta_keywords)data.meta_keywords = unique(param.meta_keywords.replace(" ","").split(","))
            contentModel.save(data, (resp) => {
                if (!resp._id)
                    return callback(Resp.error({msg:"Could not save data.", resp:null}))
                else { 
                    if (param.post_to_fb) {
                        const settingsDAO = require('./SettingsDAO')
                        settingsDAO.publish_fb(resp._id, user, (state)=>{
                            if (state.status) {
                                return callback(Resp.success({msg:"Content added and published", resp:resp}))
                            }
                        })
                    } else
                        return callback(Resp.success({msg:"Content successfully added.", resp:resp}))
                }
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    update: (param, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push('Provide Identity')
        if (param.title)data.title = param.title
        if (param.title)data.slug = urlSlug(param.title)
        if (param.category)data.category = param.category
        if (param.subcategory)data.subcategory = param.subcategory
        if (param.type)data.type = param.type
        if (param.media)data.media_link = param.media
        if (param.featured)data.featured = param.featured
        if (param.short_content)data.short_content = param.short_content
        if (param.content)data.content = param.content
        if (param.cover_img)data.cover_img = param.cover_img
        if (param.thumb_img)data.thumb_img = param.thumb_img
        if (param.keywords)data.keywords = unique(param.keywords.replace(" ","").split(","))
        if (param.author)data.author = param.author
        if (param.meta_title)data.meta_title = param.meta_title
        if (param.meta_keywords)data.meta_keywords = unique(param.keywords.replace(" ","").split(","))
        if (param.meta_description)data.meta_description = param.meta_description
        if (param.status)data.status = param.status

        if (error.length == 0) {
            if (data) {
                contentModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id)
                        return callback(Resp.error({msg:"Something went wrong updating data...", resp:null}))
                    else
                        return callback(Resp.success({msg:"Content successfully updated", resp:resp}))
                })
            }
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    by_identity: (identity, callback) => {
        contentModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error) 
                return callback(Resp.success({msg:"Data found", resp:state}))
            else 
                return callback(Resp.error({msg:"No data found", resp:null}))
        })
    },

    pull: (param, user, callback) => {
        param.client_id = user._id
        contentModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    del: (param, callback) => {
        const error = []
        if (!param.identity)error.push('Provide identity')

        if (error.length == 0) {
            contentModel.del(param.identity, (resp) => {
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