const Connector = require('./Connector')

var Google = {

    run_report: async (request) => { //request {property:id, dateRanges:{start_date, end_date}, dimensions:[{name:dimensionNames}], metrics:[{name:metricsNames}]}
        const [response] = await Connector.GoogleAPI().runReport({
            property: `properties/${request.property}`,
            dateRanges:[request.dateRanges],
            dimensions:request.dimensions,
            metrics:request.metrics
        })
        return response
    }
}

module.exports = Google