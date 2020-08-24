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
const getTable = require('../utils/movieTableSelector')

const rateController = {}

/**
 * Handles GET requests to /rate-movies
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
rateController.getMovies = (req, res, next) => {
  try {
    const locals = {
      isAuthenticated: req.session.isAuthenticated,
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }

    const user = req.session.user
    const date = new Date(user.birth_date)

    // a string that selects which table/view of movies a user accesses
    const movies = getTable(date)

    // handle keyword search for movies
    if (req.query.search) {
      const keywords = parseWords(req.query.search)
      locals.keywords = keywords

      // query to get movies using keywords (also
      // joins ratings of a specific user)
      let qs =
      'SELECT ID, title, year, avg_rating AS average_rating, rating AS my_rating ' +
      `FROM ${movies} ` +
      'LEFT JOIN ( ' +
        'SELECT viewerID, movieID, rating ' +
        'FROM rates ' +
        `WHERE viewerID = ${user.ID}) AS my_rating ` +
      `ON ${movies}.ID = my_rating.movieID ` +
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
        if (err) {
          return next(createError(500, 'Error in query to db'))
        }
        locals.data = results
      })
    } else if (req.query['a-z']) {
      // handle a-z search for movies by first letter
      const index = req.query['a-z']
      locals.index = index

      // query to get movies by first letter (also
      // joins ratings of a specific user)
      const qs =
      'SELECT ID, title, year, length, certificate, avg_rating AS average_rating, rating AS my_rating ' +
      `FROM ${movies} ` +
      'LEFT JOIN ( ' +
        'SELECT viewerID, movieID, rating ' +
        'FROM rates ' +
        `WHERE viewerID = ${user.ID}) AS my_rating ` +
      `ON ${movies}.ID = my_rating.movieID ` +
      `WHERE title LIKE '${index}%'`

      db.query(qs, function (err, results, fields) {
        if (err) {
          return next(createError(500, 'Error in query to db'))
        }
        locals.data = results
      })
    }

    res.render('rate/rateMovies', { locals })
  } catch (error) {
    next(error)
  }
}

/**
 * Handles GET requests to /rate-movies/:movieID
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
rateController.getMovie = (req, res, next) => {
  try {
    const locals = {
      isAuthenticated: req.session.isAuthenticated
    }
    const user = req.session.user
    const date = new Date(user.birth_date)
    const url = req.originalUrl
    const movieID = url.substr(url.length - 5)

    // a string that selects which table/view of movies a user accesses
    const movies = getTable(date)

    // query to get a specific movie by ID (also
    // joins rating of a specific user)
    const qs =
      'SELECT ID, title, year, length, certificate, avg_rating AS average_rating, rating AS my_rating ' +
      `FROM ${movies} ` +
      'LEFT JOIN ( ' +
        'SELECT viewerID, movieID, rating ' +
        'FROM rates ' +
        `WHERE viewerID = ${user.ID}) AS my_rating ` +
      `ON ${movies}.ID = my_rating.movieID ` +
      `WHERE ID = '${movieID}'`

    db.query(qs, function (err, results, fields) {
      if (err) {
        return next(createError(500, 'Error in query to db'))
      }
      locals.data = results
    })

    res.render('rate/movie', { locals })
  } catch (error) {
    next(error)
  }
}

/**
 * Handles POST requests to /rate-movies/:movieID
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
rateController.rateMovie = (req, res, next) => {
  try {
    const user = req.session.user

    const url = req.originalUrl
    const movieID = url.substr(url.length - 5)

    let today = new Date()
    var yyyy = today.getFullYear()
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var dd = String(today.getDate()).padStart(2, '0')
    today = yyyy + '-' + mm + '-' + dd

    const values = [
      user.ID,
      movieID,
      parseInt(req.body.rating),
      today
    ]

    // query to insert the movie rating of a specific user
    const qs =
      'INSERT INTO movie_guru.rates(viewerID, movieID, rating, date) ' +
      'VALUES (?) ' +
      `ON DUPLICATE KEY UPDATE rating =${values[2]}`

    db.query(qs, [values], (err, results, fields) => {
      if (err) {
        return next(createError(500, 'Error in query to db'))
      }

      updateMovie(next, movieID)
      res.redirect('/rate-movies')
    })
  } catch (error) {
    next(error)
  }
}

/**
 * Updates movie avg_rating + ratings_count in db
 *
 * @param {Function} next - next middleware func
 * @param {number} movieID
 *
 */
function updateMovie (next, movieID) {
  // query updates movie avg_rating + ratings_count (
  // sub-query calculates avg + count from rates table)
  const qs =
    'UPDATE movies m, ' +
      '(  SELECT movieID, AVG(rating) AS avg, COUNT(rating) AS count ' +
      '   FROM rates ' +
      `   WHERE movieID = '${movieID}' ` +
      ') r ' +
      'SET m.avg_rating = r.avg, ' +
      'm.ratings_count = r.count ' +
      `WHERE ID = '${movieID}'`

  db.query(qs, (err, results, fields) => {
    if (err) {
      return next(createError(500, 'Error in query to db'))
    }
  })
}

// Exports
module.exports = rateController
