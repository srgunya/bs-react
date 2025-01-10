function getBlockFilter(req) {
	const filter = [
		req.body.price.length != 0 && {
			range: { discount_price: { gte: req.body.price[0], lte: req.body.price[1] } },
		},
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

	return filter
}

function getBooleanFilter(req) {
	const filterBoolean =
		req.body.price.length != 0 ||
		req.body.pol.length != 0 ||
		req.body.kategoriya.length != 0 ||
		req.body.tsvet.length != 0 ||
		req.body.razmer.length != 0 ||
		req.body.brand.length != 0
			? true
			: false
	return filterBoolean
}

function getSort(req) {
	const sort =
		req.params['sort'] == 'priceDESC'
			? { discount_price: { order: 'desc' } }
			: req.params['sort'] == 'priceASC'
			? { discount_price: { order: 'asc' } }
			: [{ class: { order: 'desc' } }, { category: { order: 'asc' } }]
	return sort
}

function getUnisex(req) {
	const unisex =
		req.params['props'].includes('мужское') || req.params['props'].includes('женское')
			? req.params['props'].replace('мужское', 'унисекс').replace('женское', 'унисекс')
			: ''
	return unisex
}

module.exports = { getBlockFilter, getBooleanFilter, getUnisex, getSort }
