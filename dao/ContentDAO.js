const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const unique = require('array-unique')
const contentModel = require('./../model/ContentModel')
const categoryModel = require('./../model/CategoryModel')
const subcategoryModel = require('./../model/SubcategoryModel')
const urlSlug = require('url-slug')

const initDAO = {

    create: (param, user, callback) => {
        const error = []
        if (!param.title)error.push('Provide title for content')
        if (!param.category_id)error.push('Select a category')
        if (!param.type)error.push('Select a type for content')

        if (error.length == 0) {
            const data = {title:param.title, slug:param.slug, category_id:param.category_id, category_label:param.category_label, subcategory_id:param.subcategory_id, subcategory_label:param.subcategory_label, type:param.type,
            media_link:param.media, featured:param.featured, short_content:param.short_content, content:param.content, cover_img:param.cover_img, thumb_img:param.thumb_img, author:param.author, meta_title:param.meta_title, meta_keyword:param.meta_keyword, meta_description:param.meta_description, 
            client_id:user._id, status:param.status, link:user.website + '/post/' + param.slug}
            if (param.pub_date)data.pub_date = Util.date_time(param.pub_date)
            if (param.keywords)data.keywords = unique(param.keywords.replace(" ","").split(","))
            if (param.meta_keywords)data.meta_keywords = unique(param.meta_keywords.replace(" ","").split(","))
            contentModel.save(data, (resp) => {
                if (!resp._id)
                    return callback(Resp.error({msg:"Could not save data.", resp:null}))
                else { 
                    if (param.fb_status) {
                        const settingsDAO = require('./SettingsDAO')
                        settingsDAO.publish_fb(resp._id, user, (state)=>{
                            if (state.status) {
                                return callback(Resp.success({msg:"Content added and published", resp:resp}))
                            } //else block required
                        })
                    } else
                        return callback(Resp.success({msg:"Content successfully added.", resp:resp}))
                }
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    update: (param, user, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push('Provide Identity')
        if (param.title)data.title = param.title
        if (param.slug){data.slug = urlSlug(param.slug)} else {data.slug = urlSlug(param.title)}
        if (param.category_id)data.category_id = param.category_id
        if (param.category_label)data.category_label = param.category_label
        if (param.subcategory_id)data.subcategory_id = param.subcategory_id
        if (param.subcategory_label)data.subcategory_label = param.subcategory_label
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

    pull: (param, callback) => {
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
    },

    category_create: (param, user, callback) => {
        const error = []
        if (!param.label)error.push('Provide label for category')

        if (error.length === 0) {
            const data = {
                label: param.label,
                slug: urlSlug(param.label),
                image: param.image,
                description:param.description,
                client_id:user.id,
                status:param.status
            }
            categoryModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:"Could not save data.", resp:null}))
                else
                    return callback(Resp.success({msg:"Category successfully added.", resp:resp}))  
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    category_update: (param, user, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push("Provide identity")
        if (param.label)data.label = param.label
        if (param.label)data.slug = urlSlug(param.label)
        if (param.image)data.image = param.image
        if (param.description)data.description = param.description
        data.status = param.status

        if (error.length === 0) {
            if (data) {
                categoryModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:"something went wrong updating data...", resp:null}))
                    } else 
                        return callback(Resp.success({msg:"Category successfully updated.", resp:resp}))
                })
            }
        } else
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    category_by_identity: (identity, callback) => {
        categoryModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error)
                return callback(Resp.success({msg:"Data found", resp:state}))
            else 
                return callback(Resp.error({msg:"No data found", resp:null}))
        })
    },

    category_pull: (param, callback) => {
        categoryModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    category_del: () => {
        const error = []
        if (!param.identity)error.push('Provide identity')

        if (error.length == 0) {
            categoryModel.del(param.identity, (resp) => {
                if (resp)
                    return callback(Resp.success({msg:"Data successfully deleted."}))
                else
                    return callback(Resp.error({msg:"Error in deleting data"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    subcategory_create: (param, user, callback) => {
        const error = []
        if (!param.label)error.push('Provide label for subcategory')

        if (error.length === 0) {
            const data = {
                label: param.label,
                slug: urlSlug(param.label),
                category_id:param.category_id,
                category_label:param.category_label,
                description:param.description,
                client_id:user.id,
                status:param.status
            }
            subcategoryModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:"Could not save data.", resp:null}))
                else
                    return callback(Resp.success({msg:"Sub Category successfully added.", resp:resp}))  
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    subcategory_update: (param, user, callback) => {
        const error = [], data = {}
        if (!param.identity)error.push("Provide identity")
        if (param.label)data.label = param.label
        if (param.label)data.slug = urlSlug(param.label)
        if (param.category)data.category_id = param.category_id
        if (param.category_label)data.category_label = param.category_label
        if (param.description)data.description = param.description
        if (param.status){data.status = param.status} else {data.status = false}

        if (error.length === 0) {
            if (data) {
                subcategoryModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:"something went wrong updating data..."}))
                    } else 
                        return callback(Resp.success({msg:"Sub Category successfully updated.", resp:resp}))
                })
            }
        } else
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    subcategory_by_identity: (identity, callback) => {
        subcategoryModel.findOne({conditions:{_id:identity}}, (state) => {
            if (state && !state.error)
                return callback(Resp.success({msg:"Data found", resp:state}))
            else 
                return callback(Resp.error({msg:"No data found", resp:null}))
        })
    },

    subcategory_pull: (param, callback) => {
        subcategoryModel.findAll((Util.param_filter(param)), (state) => { 
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    subcategory_del: () => {
        const error = []
        if (!param.identity)error.push('Provide identity')

        if (error.length == 0) {
            subcategoryModel.del(param.identity, (resp) => {
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