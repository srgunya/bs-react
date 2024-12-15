const client = require('./elk')

async function getPagination(req, res) {
	let result
	let unisex =
		req.params['props'].includes('мужское') || req.params['props'].includes('женское')
			? req.params['props'].replace('мужское', 'унисекс').replace('женское', 'унисекс')
			: ''
	const filter = [
		req.body.pol.length > 0 && {
			terms: { sex: [...req.body.pol] },
		},
		req.body.kategoriya.length > 0 && {
			terms: { category: [...req.body.kategoriya] },
		},
		req.body.tsvet.length > 0 && {
			terms: { color: [...req.body.tsvet] },
		},
		req.body.razmer.length > 0 && {
			terms: { size: [...req.body.razmer] },
		},
		req.body.brand.length > 0 && {
			terms: { 'brand.keyword': [...req.body.brand] },
		},
	].filter(el => el != false)
	const filterBoolean =
		req.body.pol.length > 0 ||
		req.body.kategoriya.length > 0 ||
		req.body.tsvet.length > 0 ||
		req.body.razmer.length > 0 ||
		req.body.brand.length > 0
			? true
			: false

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
					...(filterBoolean && { filter: filter }),
				},
			},
		})
	} else if (req.params['props'] == 'new') {
		result = await client.count({
			index: 'bs_item',
			query: {
				bool: {
					must: [{ match_all: {} }],
					...(filterBoolean && { filter: filter }),
				},
			},
		})
	} else if (req.params['props'] == 'sale') {
		result = await client.count({
			index: 'bs_item',
			query: {
				bool: {
					must: [
						{
							range: {
								sale: {
									gt: 0,
								},
							},
						},
					],
					...(filterBoolean && { filter: filter }),
				},
			},
		})
	} else {
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
					],
					...(filterBoolean && { filter: filter }),
				},
			},
		})
	}
	res.send(`${result.count}`)
}

module.exports = getPagination
