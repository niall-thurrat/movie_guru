/**
 * Users controller
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const db = require('../config/db')
// const createError = require('http-errors')

const usersController = {}

/**
 * Handling GET requests to /users/register
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 *
 */
usersController.getRegister = (req, res) => {
  res.render('users/register')
}

/**
 * Handling POST requests to /users/register
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 *
 */
usersController.postRegister = (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    birth_date: req.body.birth_date
  }

  db.query('INSERT INTO viewers SET ?',
    user, function (error, results, fields) {
      if (error) {
        req.session.flash = {
          type: 'danger',
          text: 'There\'s a problem with your ' +
          'credentials. Please try again.'
        }

        res.redirect('/users/register')
      } else {
        req.session.flash = {
          type: 'success',
          text: 'You have successfully registered your ' +
          'new account. Please login to access it.'
        }

        res.redirect('/users/login')
      }
    })
}

/**
 * Handling GET requests to /users/login
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 *
 */
usersController.getLogin = (req, res) => {
  res.render('users/login')
}

/**
 * Handling GET requests to /users/logout
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 *
 */
usersController.getLogout = (req, res, next) => {
  res.render('users/logout')
}

// Exports
module.exports = usersController
