const client = require('./elk')

async function getList(req, res) {
	let result
	const size = req.params['page'] > 100 ? 0 : req.params['limit']
	const skip = req.params['page'] > 100 ? 0 : size * (Number(req.params['page']) - 1)
	let unisex =
		req.params['props'].includes('мужское') || req.params['props'].includes('женское')
			? req.params['props'].replace('мужское', 'унисекс').replace('женское', 'унисекс')
			: ''
	const price =
		"doc['sale'].value == 0? Math.round(doc['price'].value) : Math.round(doc['price'].value - doc['price'].value * doc['sale'].value / 100)"
	const sort =
		req.params['sort'] == 'priceDESC'
			? {
					_script: {
						script: price,
						type: 'number',
						order: 'desc',
					},
			  }
			: req.params['sort'] == 'priceASC'
			? {
					_script: {
						script: price,
						type: 'number',
						order: 'asc',
					},
			  }
			: [{ class: { order: 'desc' } }, { category: { order: 'asc' } }]

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
		result = await client.search({
			index: 'bs_item',
			from: skip,
			size: size,
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
			sort: sort,
		})
	} else if (req.params['props'] == 'new') {
		result = await client.search({
			index: 'bs_item',
			from: skip,
			size: size,
			query: {
				bool: {
					must: [{ match_all: {} }],
					...(filterBoolean && { filter: filter }),
				},
			},
			sort: sort,
		})
	} else if (req.params['props'] == 'sale') {
		result = await client.search({
			index: 'bs_item',
			from: skip,
			size: size,
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
			sort: sort,
		})
	} else {
		result = await client.search({
			index: 'bs_item',
			from: skip,
			size: size,
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
			sort: sort,
		})
	}

	result = result.hits.hits.map(el => el._source)
	res.send(result)
}

module.exports = getList
