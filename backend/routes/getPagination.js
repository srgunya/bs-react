const express = require('express')
const router = express.Router()
const getPagination = require('../controllers/getPagination')

router.post('/getPagination/:props', getPagination)

module.exports = router
