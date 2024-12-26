const client = require('../helpers/elk')

async function getParams(req, res) {
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

module.exports = getParams
