const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// nodemon src/app.js -e js,hbss
console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//Setup handlebars partials path
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  // res.send('<h1>Weather</h1>')
  res.render('index', {
    name: 'Bern',
    title: 'Weather app'
  })
})

app.get('/about', (req, res) => {
  // res.send('<h1>About</h1>')
  res.render('about', {
    title: 'About',
    name: 'bernuli'
  })
})

app.get('/help', (req, res) => {
  // // express automatically detects we are sending an object
  // // and automatically parses it and converts it to JSON
  // res.send([{ name: 'Andrew', age: 27 }, { name: 'Bern', age: 29 }])
  res.render('help', {
    message: 'help me please',
    title: 'Help',
    name: 'Burns'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
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
    }
  )
})

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

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Help',
    name: 'Bern',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Bern',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})
