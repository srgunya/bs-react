const express = require('express')
const router = express.Router()

router.get('/get404', (req, res) => {
	res.status(404).send()
})

module.exports = router
