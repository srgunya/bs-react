const express = require('express')
const { orders } = require('../pages/faqId.orders')
const { shipping } = require('../pages/faqId.shipping')
const { exchange } = require('../pages/faqId.exchange')
const { products } = require('../pages/faqId.products')
const { discount } = require('../pages/faqId.discount')
const { store } = require('../pages/faqId.store')
const { oferta } = require('../pages/oferta')
const { privacy } = require('../pages/privacy')
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
router.get('/oferta', (req, res) => {
	res.send(oferta())
})
router.get('/privacy', (req, res) => {
	res.send(privacy())
})

module.exports = router
