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
					aggs: active(req.body.price, filter, 'discount_price').aggs,
					filter: {
						bool: {
							filter: filter.filter(el => !('range' in el)),
						},
					},
				},
				pol: {
					aggs: active(req.body.pol, filter, 'sex').aggs,
					filter: active(req.body.pol, filter, 'sex').filter,
				},
				kategoriya: {
					aggs: active(req.body.kategoriya, filter, 'category').aggs,
					filter: active(req.body.kategoriya, filter, 'category').filter,
				},
				tsvet: {
					aggs: active(req.body.tsvet, filter, 'color').aggs,
					filter: active(req.body.tsvet, filter, 'color').filter,
				},
				razmer: {
					aggs: active(req.body.razmer, filter, 'size').aggs,
					filter: active(req.body.razmer, filter, 'size').filter,
				},
				brand: {
					aggs: active(req.body.brand, filter, 'brand', 'brand.keyword').aggs,
					filter: active(req.body.brand, filter, 'brand', 'brand.keyword').filter,
				},
		  }
		: {
				discount_price: {
					terms: { field: 'discount_price', size: count() },
				},
				sex: {
					terms: { field: 'sex', size: count() },
				},
				category: {
					terms: { field: 'category', size: count() },
				},
				color: {
					terms: { field: 'color', size: count() },
				},
				size: {
					terms: { field: 'size', size: count() },
				},
				brand: {
					terms: { field: 'brand.keyword', size: count() },
				},
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
		aggs: {
			...(req.length != 0 && {
				[key]: {
					terms: { field: name ? name : key, size: count() },
				},
			}),
		},
		...(key != 'discount_price' && {
			filter: {
				bool: {
					filter: fil.filter(
						el => JSON.stringify(el.terms) != JSON.stringify({ [name ? name : key]: [...req] })
					),
				},
			},
		}),
	}
}

module.exports = { getAggs }
