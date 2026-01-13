const client = require('../helpers/elk')

async function getById(req, res) {
	const index =
		req.route.path == '/getLogoById/:id'
			? 'bs_logo'
			: req.route.path == '/getItemById/:id'
			? 'bs_item'
			: null

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
