const request = require('request')
const SECRET_KEY = 'e321b73e7d498f5dd5c4f5db51482799'

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/' + SECRET_KEY + '/' + latitude + ',' + longitude

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.currently.summary)
        }
    })
}

module.exports = forecast