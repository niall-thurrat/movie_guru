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
 * @param {Function} next - next middleware func
 *
 */
myPageController.get = (req, res, next) => {
  try {
    const user = req.session.user
    const date = new Date(user.birth_date)
    const formattedDate = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' + date.getDate()

    const locals = {
      username: user.username,
      dob: formattedDate
    }

    res.render('myPage', { locals })
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = myPageController
