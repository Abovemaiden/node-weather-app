const request = require('request')
const ACCESS_TOKEN = 'pk.eyJ1IjoibWl5YXdha2kiLCJhIjoiY2s2eGxocXZ0MGFjNDNrczVpOXJxcmcxdiJ9.0QBt3YViW0053N0a9kilaA'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) + '.json?access_token=' + ACCESS_TOKEN + '&limit=1'

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services ', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location ', undefined)
        } else {
            callback(err, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode