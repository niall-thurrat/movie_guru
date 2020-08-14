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
homeController.get = async (req, res, next) => {
  try {
    const locals = { isAuthenticated: false }

    // Get the 10 movies with the highest average rating
    const query1 =
      'SELECT title, avg_rating, ratings_count ' +
      'FROM movies ' +
      'GROUP BY ID ' +
      'ORDER BY avg_rating DESC ' +
      'LIMIT 10'

    // Get 10 movies with the highest average rating in
    // the last week (last 7 days and today)
    const query2 =
    'SELECT title, AVG(rating) AS avg_rating, COUNT(rating) AS ratings_count ' +
    'FROM rates ' +
    'JOIN movies ON rates.movieID = movies.ID ' +
    'WHERE date >= DATE(NOW()) - INTERVAL 7 DAY ' +
    'GROUP BY movieID ' +
    'ORDER BY avg_rating DESC ' +
    'LIMIT 10'

    await db.query(query1, function (error, results, fields) {
      if (error) throw error
      locals.data1 = results
    })

    await db.query(query2, function (error, results, fields) {
      if (error) throw error
      locals.data2 = results
    })

    res.status(200)
    res.render('home', { locals })
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = homeController
