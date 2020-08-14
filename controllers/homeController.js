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
    const locals = { isAuthenticated: false }
    const queryStrings = []
    const promises = []

    // Gets 10 movies with the highest average rating
    const qs1 =
      'SELECT title, ROUND( avg_rating,1 ) AS avg_rating, ratings_count ' +
      'FROM movies ' +
      'GROUP BY ID ' +
      'ORDER BY avg_rating DESC ' +
      'LIMIT 10'

    // Gets 10 movies with the highest average rating in
    // the last week (last 7 days and today)
    const qs2 =
      'SELECT title, ROUND( avg_rating,1 ) AS avg_rating, COUNT(rating) AS ratings_count ' +
      'FROM rates ' +
      'JOIN movies ON rates.movieID = movies.ID ' +
      'WHERE date >= DATE(NOW()) - INTERVAL 7 DAY ' +
      'GROUP BY movieID ' +
      'ORDER BY avg_rating DESC ' +
      'LIMIT 10'

    // Gets the top 10 directors whose movies have
    // the best average rating
    const qs3 =
      'SELECT director_name, ROUND( AVG(avg_rating),1 ) AS dir_avg_rating, SUM(ratings_count) AS ratings_count ' +
      'FROM directs ' +
      'JOIN movies ON directs.movieID = movies.ID ' +
      'JOIN directors ON directs.directorID = directors.ID ' +
      'GROUP BY directorID ' +
      'ORDER BY dir_avg_rating DESC ' +
      'LIMIT 10'

    // Gets the top 10 actors whose movies have the
    // best average rating
    const qs4 =
      'SELECT actor_name, ROUND( AVG(avg_rating),1 ) AS act_avg_rating, SUM(ratings_count) AS ratings_count ' +
      'FROM stars_in ' +
      'JOIN movies ON stars_in.movieID = movies.ID ' +
      'JOIN actors ON stars_in.actorID = actors.ID ' +
      'GROUP BY actorID ' +
      'ORDER BY act_avg_rating DESC ' +
      'LIMIT 10'

    queryStrings.push(qs1, qs2, qs3, qs4)

    queryStrings.forEach(qs => {
      const promise = new Promise((resolve, reject) => {
        db.query(qs, function (error, results, fields) {
          if (error) reject(error)
          resolve(results)
        })
      })
      promises.push(promise)
    })

    Promise.all(promises)
      .then(result => {
        locals.data = result
        res.render('home', { locals })
      })
      .catch(error =>
        console.log(`Error in promises ${error}`))
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = homeController
