const _config = require('./../config/app.json')
const dotenv = require('dotenv').config()

const Connector = {

    _mongo: null,
    _google: null,

    MongoDB: () => {
        if (Connector._mongo == null) {
            const mongoose = require('mongoose')
            //const url = process.env.MONGODB_URI
            const url = 'mongodb://'+_config.mongodb.host+':'+_config.mongodb.port+'/'+_config.mongodb.db
            Connector._mongo = mongoose.connection

            Connector._mongo.once('open', () => {})
            Connector._mongo.on('error', () => {})
            mongoose.Promise = global.Promise;
            mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
            return Connector._mongo
        }
    },

    GoogleAPI: () => {
        if (Connector._google == null) {
            const {BetaAnalyticsDataClient} = require('@google-analytics/data')
            const credentialPath = './analytics-data-reporting-4802b01ac0aa.json'

            Connector._google = new BetaAnalyticsDataClient({
                keyFilename: credentialPath
            })
        }
        return Connector._google
    }
 
}

module.exports = Connector