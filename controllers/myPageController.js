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
    res.status(200)
    const resBody = 'GET my page'

    res.send(resBody)
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = myPageController
