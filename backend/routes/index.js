const express = require('express')
const router = express.Router()

const getCount = require('./getCount')
const getById = require('./getById')
const getParams = require('./getParams')
const getList = require('./getList')
const getPagination = require('./getPagination')
const getFilter = require('./getFilter')
const getBrandlist = require('./getBrandlist')
const get404 = require('./get404')
const getFaqIdPage = require('./getFaqIdPage')

router.use('/', getCount)
router.use('/', getById)
router.use('/', getParams)
router.use('/', getList)
router.use('/', getPagination)
router.use('/', getFilter)
router.use('/', getBrandlist)
router.use('/', get404)
router.use('/', getFaqIdPage)

module.exports = router
