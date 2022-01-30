const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const passport = require('passport')

const pkg = require('./../../package.json')
const indexRouter = require('./../routes/index')
const signupRouter = require('./../routes/signup.route')
const profileRouter = require('./../routes/profile.route')
const validationRouter = require('./../routes/validation.route')

const app = express()

require('../passport/strategys')()

//setup
app.set('port', process.env.PORT || '3000')
app.set('pkg', pkg)

//middlewares
app.use(cors({  }))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

//routes
app.use('/', indexRouter)
app.use('/signup', signupRouter)
app.use('/profile', profileRouter)
app.use('/validation', validationRouter)

module.exports = app
