/**
 * Users controller
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const usersController = {}

/**
 * Handling GET requests to /users/register
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
usersController.getRegister = (req, res, next) => {
  try {
    res.render('users/register')
  } catch (error) {
    next(error)
  }
}

/**
 * Handling GET requests to /users/login
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
usersController.getLogin = (req, res, next) => {
  try {
    res.render('users/login')
  } catch (error) {
    next(error)
  }
}

/**
 * Handling GET requests to /users/login
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - next middleware func
 *
 */
usersController.getLogout = (req, res, next) => {
  try {
    res.render('users/logout')
  } catch (error) {
    next(error)
  }
}

// Exports
module.exports = usersController
