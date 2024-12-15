const express = require('express')
const router = express.Router()
const getFilter = require('../controllers/getFilter')

router.post('/getFilter/:props', getFilter)

module.exports = router
