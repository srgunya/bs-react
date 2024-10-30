require('dotenv').config()
const express = require('express')
const router = require('./routes')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
	res.setHeader('Access-Control-Allow-Headers', '*')
	next()
})

app.use(router)

app.listen(port, () => console.log('Server started on port ' + port))