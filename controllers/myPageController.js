/**
 * My page controller
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const db = require('../config/db')
const createError = require('http-errors')
const getTable = require('../utils/movieTableSelector')

const myPageController = {}

/**
 * Handling GET requests to /my-page
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
myPageController.get = async (req, res, next) => {
  try {
    const locals = {
      isAuthenticated: req.session.isAuthenticated
    }
    const queryStrings = []
    const promises = []

    // profile info for locals
    const user = req.session.user
    const date = new Date(user.birth_date)
    const formattedDate = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' + date.getDate()
    locals.dob = formattedDate
    locals.username = user.username

    // a string that selects which table/view of movies a user accesses
    const movies = getTable(date)

    // Gets the total number of ratings a specific user has made
    const qs1 =
    'SELECT COUNT(rating) AS my_ratings_count ' +
    'FROM rates ' +
    `WHERE viewerID = ${user.ID}`

    // Gets the sum of the length of all rated
    // movies of a specific user
    const qs2 =
    'SELECT SUM(length) AS watch_time_sum ' +
    'FROM rates ' +
    `JOIN ${movies} ON rates.movieID = ${movies}.ID ` +
    `WHERE viewerID = ${user.ID}`

    // Gets all movies a specific user has rated
    const qs3 =
    'SELECT ID, title, year, length, certificate, avg_rating, rating AS my_rating, DATE_FORMAT(date,\'%d/%m/%Y\') AS date ' +
    'FROM rates ' +
    'JOIN movies ON rates.movieID = movies.ID ' +
    `WHERE viewerID = ${user.ID} ` +
    'ORDER BY date DESC'

    // Gets the top 10 directors by average
    // movie rating of a specific viewer
    const qs4 =
    'SELECT director_name, ROUND( AVG(rating),1 ) AS my_dir_rating, COUNT(rating) AS ratings_count ' +
    'FROM rates ' +
    'JOIN directs ON rates.movieID = directs.movieID ' +
    'JOIN directors ON directs.directorID = directors.ID ' +
    `WHERE viewerID = ${user.ID} ` +
    'GROUP BY directorID ' +
    'ORDER BY my_dir_rating DESC ' +
    'LIMIT 10'

    // The top 10 average rated movies that a viewer has
    // not rated that have a director who is in the
    // viewer’s top 3 directors (by average movie rating)
    const qs5 =
    'SELECT movieID, title, year, avg_rating, director_name ' +
    'FROM directs ' +
    `JOIN ${movies} ON directs.movieID = ${movies}.ID ` +
    'JOIN directors ON directs.directorID = directors.ID ' +
    'WHERE directorID IN ( ' +
      'SELECT * FROM ( ' +
        'SELECT directorID ' +
        'FROM rates sq_rates ' +
        'JOIN directs ON sq_rates.movieID = directs.movieID ' +
        `WHERE sq_rates.viewerID = ${user.ID} ` +
        'GROUP BY directorID ' +
        'ORDER BY ROUND( AVG(rating),1 ) DESC ' +
        'LIMIT 3 ' +
      ') AS sq ' +
    ') ' +
      'AND movieID NOT IN ( ' +
        'SELECT movieID ' +
        'FROM rates ' +
        `WHERE viewerID = ${user.ID} ` +
      ') ' +
    'GROUP BY movieID ' +
    'ORDER BY avg_rating DESC ' +
    'LIMIT 10'

    // Gets the top 10 actors by average
    // movie rating of a specific viewer
    const qs6 =
    'SELECT actor_name, ROUND( AVG(rating),1 ) AS my_act_rating, COUNT(rating) AS ratings_count ' +
    'FROM rates ' +
    'JOIN stars_in ON rates.movieID = stars_in.movieID ' +
    'JOIN actors ON stars_in.actorID = actors.ID ' +
    `WHERE viewerID = ${user.ID} ` +
    'GROUP BY actorID ' +
    'ORDER BY my_act_rating DESC ' +
    'LIMIT 10'

    // The top 10 average rated movies that a viewer has
    // not rated that have an actor who is in the
    // viewer’s top 3 actors (by average movie rating)
    const qs7 =
    'SELECT movieID, title, year, avg_rating, actor_name ' +
    'FROM stars_in ' +
    `JOIN ${movies} ON stars_in.movieID = ${movies}.ID ` +
    'JOIN actors ON stars_in.actorID = actors.ID ' +
    'WHERE actorID IN ( ' +
      'SELECT * FROM ( ' +
        'SELECT actorID ' +
        'FROM rates sq_rates ' +
        'JOIN stars_in ON sq_rates.movieID = stars_in.movieID ' +
        `WHERE sq_rates.viewerID = ${user.ID} ` +
        'GROUP BY actorID ' +
        'ORDER BY ROUND( AVG(rating),1 ) DESC ' +
        'LIMIT 3 ' +
      ') AS sq ' +
    ') ' +
      'AND movieID NOT IN ( ' +
        'SELECT movieID ' +
        'FROM rates ' +
        `WHERE viewerID = ${user.ID} ` +
      ') ' +
    'GROUP BY movieID ' +
    'ORDER BY avg_rating DESC ' +
    'LIMIT 10'

    queryStrings.push(qs1, qs2, qs3, qs4, qs5, qs6, qs7)

    // pushes query promises to an array
    queryStrings.forEach(qs => {
      const promise = new Promise((resolve, reject) => {
        db.query(qs, function (error, results, fields) {
          if (error) reject(error)
          resolve(results)
        })
      })
      promises.push(promise)
    })

    // processes query promises asyncronously
    Promise.all(promises)
      .then(result => {
        locals.data = result

        res.render('myPage', { locals })
      })
      .catch(error => {
        return next(createError(500, `Error in promises ${error}`))
      })
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = myPageController
