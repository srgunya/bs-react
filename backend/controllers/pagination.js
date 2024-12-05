const client = require('./elk')

async function pagination(req, res) {
	let result
	let unisex = ''
	if (req.params['props'].includes('мужское') || req.params['props'].includes('женское')) {
		unisex = req.params['props'].replace('мужское', 'унисекс').replace('женское', 'унисекс')
	}
	if (req.params['props'].includes('sale') && req.params['props'].length > 4) {
		unisex = unisex.replace('sale', '').trim()
		const params = req.params['props'].replace('sale', '').trim()
		result = await client.count({
			index: 'bs_item',
			query: {
				bool: {
					must: [
						{
							bool: {
								should: [
									{
										match: {
											list_prop: {
												query: params,
												operator: 'AND',
												fuzziness: 'AUTO',
											},
										},
									},
									{
										match: {
											list_prop: {
												query: unisex,
												operator: 'AND',
												fuzziness: 'AUTO',
											},
										},
									},
								],
							},
						},
						{
							range: {
								sale: {
									gt: 0,
								},
							},
						},
					],
				},
			},
		})
	} else if (req.params['props'] == 'new') {
		result = await client.count({
			index: 'bs_item',
			query: {
				match_all: {},
			},
		})
	} else if (req.params['props'] == 'sale') {
		result = await client.count({
			index: 'bs_item',
			query: {
				range: {
					sale: {
						gt: 0,
					},
				},
			},
		})
	} else {
		result = await client.count({
			index: 'bs_item',
			query: {
				bool: {
					should: [
						{
							match: {
								list_prop: {
									query: req.params['props'],
									operator: 'AND',
									fuzziness: 'AUTO',
								},
							},
						},
						{
							match: {
								list_prop: {
									query: unisex,
									operator: 'AND',
									fuzziness: 'AUTO',
								},
							},
						},
					],
				},
			},
		})
	}
	res.send(`${result.count}`)
}

module.exports = pagination
