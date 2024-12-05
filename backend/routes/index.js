const express = require('express')
const router = express.Router()

const getCount = require('./getCount')
const getById = require('./getById')
const isTranslit = require('./isTranslit')
const getList = require('./getList')
const pagination = require('./pagination')

router.use('/', getCount)
router.use('/', getById)
router.use('/', isTranslit)
router.use('/', getList)
router.use('/', pagination)

module.exports = router
