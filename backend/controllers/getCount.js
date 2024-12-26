const client = require('../helpers/elk')

async function getCount(req, res) {
	let index
	if (req.url == '/logoCount') {
		index = 'bs_logo'
	} else if (req.url == '/itemCount') {
		index = 'bs_item'
	}
	let result = await client.count({ index: index })
	res.send(`${result.count}`)
}

module.exports = getCount
