const { elasticSearch } = require('./elasticSearch')

async function getBrandlist(req, res) {
	const aggs = {
		brand: {
			terms: { field: 'brand.keyword', size: 10000 },
		},
	}
	const result = await elasticSearch({
		req: req,
		unisex: null,
		aggs: aggs,
		from: null,
		size: null,
		sort: null,
		filter: null,
		filterBoolean: null,
		func: 'search',
	})
	const brands = result.aggregations.brand.buckets.map(el => {
		return el.key
	})
	res.send(brands)
}
module.exports = getBrandlist
