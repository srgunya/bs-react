const express = require('express')
const router = express.Router()
const getParams = require('../controllers/getParams')

router.get('/getParams/:word', getParams)

module.exports = router
