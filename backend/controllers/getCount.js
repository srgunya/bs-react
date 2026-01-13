const client = require('../helpers/elk')

async function getCount(req, res) {
	const index =
		req.url == '/logoCount'
			? 'bs_logo'
			: req.url == '/itemCount'
			? 'bs_item'
			: null

	let result = await client.count({ index: index })
	res.send(`${result.count}`)
}

module.exports = getCount
