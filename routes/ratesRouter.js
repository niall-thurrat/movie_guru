/**
 * Rates router
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const ctr = require('../controllers/ratesController')

// GET /rate-movies
router.get('/', ctr.rates)

// Exports
module.exports = router
