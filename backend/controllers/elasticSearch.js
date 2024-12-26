const client = require('../helpers/elk')

async function elasticSearch(body) {
	const { req, unisex, aggs, from, size, sort, filter, filterBoolean, func } = body

	if (req.params['props'].includes('sale') && req.params['props'].length > 4) {
		const uni = unisex.replace('sale', '').trim()
		const params = req.params['props'].replace('sale', '').trim()
		return await client[func]({
			index: 'bs_item',
			...(from && {
				from: from,
			}),
			...(size && {
				size: size,
			}),
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
												query: uni,
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
			...(aggs && {
				aggs: aggs,
			}),
			...(sort && {
				sort: sort,
			}),
		})
	} else if (req.params['props'] == 'new') {
		return await client[func]({
			index: 'bs_item',
			...(from && {
				from: from,
			}),
			...(size && {
				size: size,
			}),
			query: {
				bool: {
					must: [{ match_all: {} }],
					...(filterBoolean && { filter: filter }),
				},
			},
			...(aggs && {
				aggs: aggs,
			}),
			...(sort && {
				sort: sort,
			}),
		})
	} else if (req.params['props'] == 'sale') {
		return await client[func]({
			index: 'bs_item',
			...(from && {
				from: from,
			}),
			...(size && {
				size: size,
			}),
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
			...(aggs && {
				aggs: aggs,
			}),
			...(sort && {
				sort: sort,
			}),
		})
	} else {
		return await client[func]({
			index: 'bs_item',
			...(from && {
				from: from,
			}),
			...(size && {
				size: size,
			}),
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
			...(aggs && {
				aggs: aggs,
			}),
			...(sort && {
				sort: sort,
			}),
		})
	}
}

module.exports = { elasticSearch }
