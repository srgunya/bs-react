const client = require('./elk')

async function getFilter(req, res) {
	let result
	let unisex =
		req.params['props'].includes('мужское') || req.params['props'].includes('женское')
			? req.params['props'].replace('мужское', 'унисекс').replace('женское', 'унисекс')
			: ''
	const price =
		"doc['sale'].value == 0? Math.round(doc['price'].value) : Math.round(doc['price'].value - doc['price'].value * doc['sale'].value / 100)"

	const filter = [
		req.body.pol.length != 0 && {
			terms: { sex: [...req.body.pol] },
		},
		req.body.kategoriya.length != 0 && {
			terms: { category: [...req.body.kategoriya] },
		},
		req.body.tsvet.length != 0 && {
			terms: { color: [...req.body.tsvet] },
		},
		req.body.razmer.length != 0 && {
			terms: { size: [...req.body.razmer] },
		},
		req.body.brand.length != 0 && {
			terms: { 'brand.keyword': [...req.body.brand] },
		},
	].filter(el => el != false)
	const filterBoolean =
		req.body.pol.length != 0 ||
		req.body.kategoriya.length != 0 ||
		req.body.tsvet.length != 0 ||
		req.body.razmer.length != 0 ||
		req.body.brand.length != 0
			? true
			: false

	const aggs = filterBoolean
		? {
				inavtive: {
					aggs: {
						price: {
							terms: {
								script: price,
								size: 10000,
							},
						},
						...(req.body.pol.length == 0 && {
							sex: {
								terms: { field: 'sex', size: 10000 },
							},
						}),
						...(req.body.kategoriya.length == 0 && {
							category: {
								terms: { field: 'category', size: 10000 },
							},
						}),
						...(req.body.tsvet.length == 0 && {
							color: {
								terms: { field: 'color', size: 10000 },
							},
						}),
						...(req.body.razmer.length == 0 && {
							size: {
								terms: { field: 'size', size: 10000 },
							},
						}),
						...(req.body.brand.length == 0 && {
							brand: {
								terms: { field: 'brand.keyword', size: 10000 },
							},
						}),
					},
					filter: {
						bool: {
							filter: filter,
						},
					},
				},
				pol: {
					aggs: {
						...(req.body.pol.length != 0 && {
							sex: {
								terms: { field: 'sex', size: 10000 },
							},
						}),
					},
					filter: {
						bool: {
							filter: filter.filter(
								el => JSON.stringify(el.terms) != JSON.stringify({ sex: [...req.body.pol] })
							),
						},
					},
				},
				kategoriya: {
					aggs: {
						...(req.body.kategoriya.length != 0 && {
							category: {
								terms: { field: 'category', size: 10000 },
							},
						}),
					},
					filter: {
						bool: {
							filter: filter.filter(
								el =>
									JSON.stringify(el.terms) != JSON.stringify({ category: [...req.body.kategoriya] })
							),
						},
					},
				},
				tsvet: {
					aggs: {
						...(req.body.tsvet.length != 0 && {
							color: {
								terms: { field: 'color', size: 10000 },
							},
						}),
					},
					filter: {
						bool: {
							filter: filter.filter(
								el => JSON.stringify(el.terms) != JSON.stringify({ color: [...req.body.tsvet] })
							),
						},
					},
				},
				razmer: {
					aggs: {
						...(req.body.razmer.length != 0 && {
							size: {
								terms: { field: 'size', size: 10000 },
							},
						}),
					},
					filter: {
						bool: {
							filter: filter.filter(
								el => JSON.stringify(el.terms) != JSON.stringify({ size: [...req.body.razmer] })
							),
						},
					},
				},
				brand: {
					aggs: {
						...(req.body.brand.length != 0 && {
							brand: {
								terms: { field: 'brand.keyword', size: 10000 },
							},
						}),
					},
					filter: {
						bool: {
							filter: filter.filter(
								el => JSON.stringify(el.terms) != JSON.stringify({ brand: [...req.body.brand] })
							),
						},
					},
				},
		  }
		: {
				price: {
					terms: {
						script: price,
						size: 10000,
					},
				},
				sex: {
					terms: { field: 'sex', size: 10000 },
				},
				category: {
					terms: { field: 'category', size: 10000 },
				},
				color: {
					terms: { field: 'color', size: 10000 },
				},
				size: {
					terms: { field: 'size', size: 10000 },
				},
				brand: {
					terms: { field: 'brand.keyword', size: 10000 },
				},
		  }

	if (req.params['props'].includes('sale') && req.params['props'].length > 4) {
		unisex = unisex.replace('sale', '').trim()
		const params = req.params['props'].replace('sale', '').trim()
		result = await client.search({
			index: 'bs_item',
			size: 0,
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
			aggs: aggs,
		})
	} else if (req.params['props'] == 'new') {
		result = await client.search({
			index: 'bs_item',
			size: 0,
			query: {
				match_all: {},
			},
			aggs: aggs,
		})
	} else if (req.params['props'] == 'sale') {
		result = await client.search({
			index: 'bs_item',
			size: 0,
			query: {
				range: {
					sale: {
						gt: 0,
					},
				},
			},
			aggs: aggs,
		})
	} else {
		result = await client.search({
			index: 'bs_item',
			size: 0,
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
			aggs: aggs,
		})
	}
	params = {}
	for (key in result.aggregations.inavtive) {
		if (typeof result.aggregations.inavtive[key] == 'object') {
			params[key] = result.aggregations.inavtive[key]
		}
	}
	for (key in result.aggregations.pol) {
		if (typeof result.aggregations.pol[key] == 'object') {
			params[key] = result.aggregations.pol[key]
		}
	}
	for (key in result.aggregations.kategoriya) {
		if (typeof result.aggregations.kategoriya[key] == 'object') {
			params[key] = result.aggregations.kategoriya[key]
		}
	}
	for (key in result.aggregations.tsvet) {
		if (typeof result.aggregations.tsvet[key] == 'object') {
			params[key] = result.aggregations.tsvet[key]
		}
	}
	for (key in result.aggregations.razmer) {
		if (typeof result.aggregations.razmer[key] == 'object') {
			params[key] = result.aggregations.razmer[key]
		}
	}
	for (key in result.aggregations.brand) {
		if (typeof result.aggregations.brand[key] == 'object') {
			params[key] = result.aggregations.brand[key]
		}
	}
	const require = filterBoolean ? params : result.aggregations
	res.send(require)
}

module.exports = getFilter
