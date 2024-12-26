const fs = require('node:fs')
const { Client } = require('@elastic/elasticsearch')

const client = new Client({
	node: 'https://localhost:9200',
	auth: {
		username: process.env.elactic_login,
		password: process.env.elactic_password,
	},
	tls: {
		ca: fs.readFileSync('./http_ca.crt'),
		rejectUnauthorized: false,
	},
})

module.exports = client
