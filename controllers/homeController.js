/**
 * Home page controller
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

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
    res.status(200)
    const resBody = 'GET home page'

    res.send(resBody)
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = homeController
