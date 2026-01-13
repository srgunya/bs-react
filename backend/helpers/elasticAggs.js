function count() {
	return 10000
}
function getAggs(req, filterBoolean, filter) {
	const aggs = filterBoolean
		? {
				inavtive: {
					aggs: {
						...inavtive(req.body.price, 'discount_price'),
						...inavtive(req.body.pol, 'sex'),
						...inavtive(req.body.kategoriya, 'category'),
						...inavtive(req.body.tsvet, 'color'),
						...inavtive(req.body.razmer, 'size'),
						...inavtive(req.body.brand, 'brand', 'brand.keyword'),
					},
					filter: {
						bool: {
							filter: filter,
						},
					},
				},
				discount_price: {
					aggs: {
						...(req.length != 0 && {
							discount_price: {
								terms: { field: 'discount_price', size: count() },
							},
						}),
					},
					filter: {
						bool: {
							filter: filter.filter(el => !('range' in el)),
						},
					},
				},
				...active(req.body.pol, filter, 'sex'),
				...active(req.body.kategoriya, filter, 'category'),
				...active(req.body.tsvet, filter, 'color'),
				...active(req.body.razmer, filter, 'size'),
				...active(req.body.brand, filter, 'brand', 'brand.keyword'),
		  }
		: {
				...inavtive(req.body.price, 'discount_price'),
				...inavtive(req.body.pol, 'sex'),
				...inavtive(req.body.kategoriya, 'category'),
				...inavtive(req.body.tsvet, 'color'),
				...inavtive(req.body.razmer, 'size'),
				...inavtive(req.body.brand, 'brand', 'brand.keyword'),
		  }
	return aggs
}

function inavtive(req, key, name) {
	return (
		req.length == 0 && {
			[key]: {
				terms: { field: name ? name : key, size: count() },
			},
		}
	)
}
function active(req, fil, key, name) {
	return {
		[key]: {
			aggs: {
				...(req.length != 0 && {
					[key]: {
						terms: { field: name ? name : key, size: count() },
					},
				}),
			},
			filter: {
				bool: {
					filter: fil.filter(
						el =>
							JSON.stringify(el.terms) !=
							JSON.stringify({ [name ? name : key]: [...req] })
					),
				},
			},
		},
	}
}

module.exports = { getAggs }
