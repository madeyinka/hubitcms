const _config = require('./../config/app.json')

const mailMessages = {

    reset: (user) => {
        const html = `click the button below to reset your password. <a href="${_config.reset-link+'?identity='+user._id}">Verify</a>`
        return html
    }
}

module.exports = mailMessages