const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5uYXJlcGx5IiwiYSI6ImNsNmdhZ3d5YzAyOHEzcXR1c2p4ZGhob20ifQ.0msTvjXfYDVEjRKmqgH-nQ&limit=1'
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services.')
        } else if (!body.features[0]){
            callback('Location not found.')
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode