const express = require('express')
require('./db/mongoose')
const path = require('path')

var bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//Routers
require('./routers/user')(app)

app.use(express.static(path.join(__dirname, 'public')))

process.title = 'Elektrozoid'

app.use(express.json)


module.exports = app