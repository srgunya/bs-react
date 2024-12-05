const express = require('express')
const router = express.Router()
const pagination = require('../controllers/pagination')

router.get('/pagination/:props', pagination)

module.exports = router
