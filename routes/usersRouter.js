/**
 * Users routes
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const ctrl = require('../controllers/usersController')

// GET, POST /users/register
router.route('/register')
  .get(ctrl.getRegister)
//  .post(ctrl.postRegister)

// GET, POST /users/login
router.route('/login')
  .get(ctrl.getLogin)
//  .post(ctrl.postLogin)

// GET, POST /users/logout
router.route('/logout')
  .get(ctrl.getLogout)
//  .post(ctrl.postLogout)

// Exports
module.exports = router
