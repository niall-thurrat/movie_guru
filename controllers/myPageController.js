/**
 * My page controller
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const myPageController = {}

/**
 * Handling GET requests to /my-page
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 *
 */
myPageController.get = (req, res) => {
  const locals = {
    isAuthenticated: req.session.isAuthenticated
  }
  const user = req.session.user
  const date = new Date(user.birth_date)
  const formattedDate = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' + date.getDate()

  locals.username = user.username
  locals.dob = formattedDate

  res.render('myPage', { locals })
}

// Exports
module.exports = myPageController
