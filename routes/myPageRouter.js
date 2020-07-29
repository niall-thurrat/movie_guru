/**
 * My page router
 *
 * @author Niall Thurrat
 * @version 1.0.0
 */

'use strict'

const router = require('express').Router()
const ctr = require('../controllers/myPageController')

// GET /my-page
router.get('/', ctr.mypage)

// Exports
module.exports = router
