const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f2809019f0f88773b25e96d308a26e84&query='+encodeURIComponent(lat)+','+encodeURIComponent(long)
    request({url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather service.')
        } else if (response.body.error){
            callback('Location not found')
        } else {
            const {temperature, feelslike, weather_descriptions} = response.body.current
            callback(undefined, {
                temp: temperature,
                feelslike: feelslike,
                desc: weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast