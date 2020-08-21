/**
 * Rate router
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const ctrl = require('../controllers/rateController')

// GET /rate-movies
router.get('/', ctrl.get)

// Exports
module.exports = router
