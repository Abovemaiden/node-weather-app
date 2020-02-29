const path = require('path')
const express = require('express')
const port = 3000
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

// home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Antonio',
        name2: 'Chi'
    })
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Antonio',
        name2: 'Chi'
    })
})

// help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Antonio',
        name2: 'Chi'
    })
})

// weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

// weather page
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name2: 'Chi',
        errorMessage: 'About article not found'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name2: 'Chi',
        errorMessage: 'Help article not found'
    })
})

// 404 not found page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name2: 'Chi',
        errorMessage: 'Page not found'
    })
})


// Serve app
app.listen(port, () => {
    console.log('Listening on port', port)
})

