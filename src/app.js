const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
console.log(__dirname)

//Define paths for express config
const dirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(dirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anna'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anna'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Anna',
        msg: '<---- Insert helpful information here ---->'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address."
        })
    }
    geocode(req.query.address, (error, {lat, long, location}={}) => {
        if (error){
            return res.send({error})
        }
        forecast(lat, long, (error, {temp, feelslike, desc} ={}) => {
            if(error){
                return res.send({error})
            }
            res.send([{
                temp: ('The temperature is '+temp+' degrees and feels like '+feelslike+' degrees. The weather is '+desc+'.'),
                location,
                address: req.query.address
            }])
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Anna',
        errornote: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Anna',
        errornote: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})