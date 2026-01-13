const {
	getUnisex,
	getBlockFilter,
	getBooleanFilter,
} = require('../helpers/elasticConst')
const { getAggs } = require('../helpers/elasticAggs')
const { elasticSearch } = require('./elasticSearch')

async function getFilter(req, res) {
	const unisex = getUnisex(req)
	const filter = getBlockFilter(req)
	const filterBoolean = getBooleanFilter(req)
	const aggs = getAggs(req, filterBoolean, filter)

	const result = await elasticSearch({
		req: req,
		unisex: unisex,
		aggs: aggs,
		from: null,
		size: null,
		sort: null,
		filter: null,
		filterBoolean: null,
		func: 'search',
	})

	const filterFacets = {
		discount_price: [],
		sex: [],
		category: [],
		color: [],
		size: [],
		brand: [],
	}
	if (filterBoolean) {
		const resultAggs = [
			result.aggregations.inavtive,
			result.aggregations.discount_price,
			result.aggregations.sex,
			result.aggregations.category,
			result.aggregations.color,
			result.aggregations.size,
			result.aggregations.brand,
		]
		resultAggs.forEach(el => {
			for (key in el) {
				if (typeof el[key] == 'object') {
					filterFacets[key] = el[key].buckets.map(el => {
						return el.key
					})
				}
			}
		})
	} else {
		for (let key in result.aggregations) {
			filterFacets[key] = result.aggregations[key].buckets.map(el => {
				return el.key
			})
		}
	}
	res.send(filterFacets)
}

module.exports = getFilter
