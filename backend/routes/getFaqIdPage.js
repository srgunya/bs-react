const express = require('express')
const { orders } = require('../pages/FaqIdPage.orders')
const { shipping } = require('../pages/FaqIdPage.shipping')
const { exchange } = require('../pages/FaqIdPage.exchange')
const { products } = require('../pages/FaqIdPage.products')
const { discount } = require('../pages/FaqIdPage.discount')
const { store } = require('../pages/FaqIdPage.store')
const router = express.Router()

router.get('/orders_faq', (req, res) => {
	res.send(orders())
})
router.get('/shipping_faq', (req, res) => {
	res.send(shipping())
})
router.get('/exchange_faq', (req, res) => {
	res.send(exchange())
})
router.get('/products_faq', (req, res) => {
	res.send(products())
})
router.get('/discount_faq', (req, res) => {
	res.send(discount())
})
router.get('/store_faq', (req, res) => {
	res.send(store())
})

module.exports = router
