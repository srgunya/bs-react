const client = require('../helpers/elk')

async function getById(req, res) {
	let index
	if (req.route.path == '/getLogoById/:id') {
		index = 'bs_logo'
	} else if (req.route.path == '/getItemById/:id') {
		index = 'bs_item'
	}
	const result = await client.search({
		index: index,
		query: {
			match: {
				id: req.params['id'],
			},
		},
	})
	res.send(result.hits.hits[0]._source)
}

module.exports = getById
