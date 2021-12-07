const mailgun = require('mailgun-js'),
      dotenv = require('dotenv').config(),
      path = require('path'), fs = require('fs'),
      Handlebars = require('handlebars')


const Mailer = {

    sendMail: function(options, file, callback) { 
        let TemplatePath = path.join(__dirname, '../templates', file+'.hbs')
        const template = fs.readFileSync(TemplatePath, 'utf-8')
        const compiledTemplate = Handlebars.compile(template)
        const _client = mailgun({ apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN})
        const mailOption = {
            from: process.env.ADMIN_EMAIL,
            to: options.email,
            subject: options.subject,
            html: compiledTemplate(options.message)
        }
        _client.messages().send(mailOption, (err,response) => {
            if (err){
                return callback(err)
            }else {
                return callback(response)
            }
        })
    }
}

module.exports = Mailer;