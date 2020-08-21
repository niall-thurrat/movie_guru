/**
 * Rate movies controller
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const parseWords = require('../utils/parseWords')

const db = require('../config/db')
const createError = require('http-errors')

const rateController = {}

/**
 * Handling GET requests to /rate-movies
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
rateController.get = (req, res, next) => {
  try {
    const locals = {
      isAuthenticated: req.session.isAuthenticated
    }

    if (req.query.search) {
      const keywords = parseWords(req.query.search)
      locals.keywords = keywords

      console.log(`KEYWORDS: ${keywords}`)

      // query to get movies using keyword
      let qs =
      'SELECT ID, title, year, avg_rating ' +
      'FROM movies ' +
      `WHERE title LIKE '%${keywords[0]}%' `

      // add to query if multiple keywords
      if (keywords.length > 1) {
        let queryAddOn = ''

        for (var i = 1; i < keywords.length; i++) {
          const keyword = keywords[i]
          const str = `AND title LIKE '%${keyword}%' `

          queryAddOn = queryAddOn + str
        }
        qs = qs + queryAddOn
      }

      db.query(qs, function (err, results, fields) {
        if (err) return next(createError(500, 'Error in query to db'))

        locals.data = results
      })
    }

    res.render('rate/rateMovies', { locals })
  } catch (error) {
    next(error)
  }
}

/**
 * Handling GET requests to /rate-movies/:movieID
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
rateController.getMovie = (req, res, next) => {
  const locals = {
    isAuthenticated: req.session.isAuthenticated
  }

  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
  locals.test = fullUrl

  res.render('rate/movie', { locals })
}

// Exports
module.exports = rateController
