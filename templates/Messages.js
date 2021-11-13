const mailMessages = {

    reset: (user) => {
        const html = `click the button below to reset your password. <a href="https://www.google.com">Verify</a>`
        return html
    }
}

module.exports = mailMessages