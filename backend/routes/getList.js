const express = require('express')
const router = express.Router()
const getList = require('../controllers/getList')

router.get('/getList/:props/:page', getList)

module.exports = router
