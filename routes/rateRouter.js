/**
 * Rate router
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const ctrl = require('../controllers/rateController')

router.get('/', ctrl.getMovies)

router.route('/:movieId')
  .get(ctrl.getMovie)
  .post(ctrl.rateMovie)

// Exports
module.exports = router
