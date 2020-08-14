/**
 * The starting point of the application.
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const express = require('express')
const hbs = require('express-hbs')
const path = require('path')
const logger = require('morgan')
const createError = require('http-errors')

const app = express()
const port = process.env.PORT || 3000

// view engine config
app.engine('hbs', hbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/', require('./routes/homeRouter'))
app.use('/my-page', require('./routes/myPageRouter'))
app.use('/rate-movies', require('./routes/rateRouter'))
app.use('/users', require('./routes/usersRouter'))

// catch 404 errors
app.use('*', (req, res, next) => next(createError(404)))

// custom error handler
app.use((err, req, res, next) => {
  // for dev purposes
  console.log(`ERROR:
    status: ${err.status}
    msg: ${err.message}
    stack: ${err.stack}`)

  res.status(err.status || 500)
    .sendFile(path.join(__dirname, 'public', `${err.status}.html`))
})

// run server
app.listen(port, () => console.log(`Server running on port ${port}`))
