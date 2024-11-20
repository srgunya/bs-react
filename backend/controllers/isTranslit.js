const client = require('./elk')

async function isTranslit(req, res) {
	const result = await client.count({
		index: 'bs_item',
		query: {
			match: {
				brand: req.params['word'],
			},
		},
	})
	res.send(`${result.count}`)
}

module.exports = isTranslit