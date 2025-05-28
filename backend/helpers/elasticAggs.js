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
				pol: active(req.body.pol, filter, 'sex'),
				kategoriya: active(req.body.kategoriya, filter, 'category'),
				tsvet: active(req.body.tsvet, filter, 'color'),
				razmer: active(req.body.razmer, filter, 'size'),
				brand: active(req.body.brand, filter, 'brand', 'brand.keyword'),
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
	const active = {
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
						el =>
							JSON.stringify(el.terms) !=
							JSON.stringify({ [name ? name : key]: [...req] })
					),
				},
			},
		}),
	}
	const wrapper =
		key == 'discount_price'
			? active
			: {
					aggs: active.aggs,
					filter: active.filter,
			  }
	return wrapper
}

module.exports = { getAggs }
