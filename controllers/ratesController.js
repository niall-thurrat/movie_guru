/**
 * Rate movies controller
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const rateController = {}

/**
 * Handling GET requests to /rate-movies
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
rateController.get = (req, res, next) => {
  try {
    res.status(200)
    const resBody = 'GET rate movies page'

    res.send(resBody)
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = rateController
