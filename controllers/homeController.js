/**
 * Home page controller
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const db = require('../config/db')

const homeController = {}

/**
 * Handling GET requests to /
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
homeController.get = (req, res, next) => {
  try {
    const query1 =
        'SELECT title, avg_rating ' +
        'FROM movies ' +
        'GROUP BY ID ' +
        'ORDER BY avg_rating DESC ' +
        'LIMIT 10'

    db.query(query1, function (error, results, fields) {
      if (error) throw error

      const locals = {
        movies: results,
        isAuthenticated: false
      }

      res.status(200)
      res.render('home', { locals })
    })
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = homeController
