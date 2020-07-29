/**
 * Users routes
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const ctr = require('../controllers/usersController')

// GET, POST /register
router.route('/register')
  .get(ctr.register)
  .post(ctr.registerPost)

// GET, POST /login
router.route('/login')
  .get(ctr.login)
  .post(ctr.loginPost)

// Exports
module.exports = router
