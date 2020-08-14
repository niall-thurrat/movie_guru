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
    // let queries = []

    // Gets 10 movies with the highest average rating
    const query1 =
      'SELECT title, ROUND( avg_rating,1 ) AS avg_rating, ratings_count ' +
      'FROM movies ' +
      'GROUP BY ID ' +
      'ORDER BY avg_rating DESC ' +
      'LIMIT 10'

    // Gets 10 movies with the highest average rating in
    // the last week (last 7 days and today)
    const query2 =
      'SELECT title, ROUND( avg_rating,1 ) AS avg_rating, COUNT(rating) AS ratings_count ' +
      'FROM rates ' +
      'JOIN movies ON rates.movieID = movies.ID ' +
      'WHERE date >= DATE(NOW()) - INTERVAL 7 DAY ' +
      'GROUP BY movieID ' +
      'ORDER BY avg_rating DESC ' +
      'LIMIT 10'

    // Gets the top 10 directors whose movies have
    // the best average rating
    const query3 =
      'SELECT director_name, ROUND( AVG(avg_rating),1 ) AS dir_avg_rating, SUM(ratings_count) AS ratings_count ' +
      'FROM directs ' +
      'JOIN movies ON directs.movieID = movies.ID ' +
      'JOIN directors ON directs.directorID = directors.ID ' +
      'GROUP BY directorID ' +
      'ORDER BY dir_avg_rating DESC ' +
      'LIMIT 10'

    // Gets the top 10 actors whose movies have the
    // best average rating
    const query4 =
      'SELECT actor_name, ROUND( AVG(avg_rating),1 ) AS act_avg_rating, SUM(ratings_count) AS ratings_count ' +
      'FROM stars_in ' +
      'JOIN movies ON stars_in.movieID = movies.ID ' +
      'JOIN actors ON stars_in.actorID = actors.ID ' +
      'GROUP BY actorID ' +
      'ORDER BY act_avg_rating DESC ' +
      'LIMIT 10'

    // queries.push(query1, query2, query3, query4)

    const promise1 = new Promise((resolve, reject) => {
      db.query(query1, function (error, results, fields) {
        if (error) reject(error)
        resolve(results)
      })
    })

    const promise2 = new Promise((resolve, reject) => {
      db.query(query2, function (error, results, fields) {
        if (error) reject(error)
        resolve(results)
      })
    })

    const promise3 = new Promise((resolve, reject) => {
      db.query(query3, function (error, results, fields) {
        if (error) reject(error)
        resolve(results)
      })
    })

    const promise4 = new Promise((resolve, reject) => {
      db.query(query4, function (error, results, fields) {
        if (error) reject(error)
        resolve(results)
      })
    })

    Promise.all([promise1, promise2, promise3, promise4])
      .then(result => {
        locals.data = result

        res.render('home', { locals })
      })
      .catch(error => console.log(`Error in promises ${error}`))
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = homeController
