const express = require('express')
const router = express.Router()
const getBrandlist = require('../controllers/getBrandlist')

router.get('/getBrands', getBrandlist)

module.exports = router
