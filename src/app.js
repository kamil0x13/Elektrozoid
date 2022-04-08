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
require('./routers/admin')(app)

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', index.html))
})

process.title = 'Elektrozoid'

//Across port error change before production >>>
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})


app.use(express.json)


module.exports = app