const client = require('../helpers/elk')
const { getUnisex, getPrice, getBlockFilter, getBooleanFilter } = require('../helpers/elasticConst')
const { getAggs } = require('../helpers/elasticAggs')
const { elasticSearch } = require('./elasticSearch')

async function getFilter(req, res) {
	const unisex = getUnisex(req)
	const price = getPrice()
	const filter = getBlockFilter(req)
	const filterBoolean = getBooleanFilter(req)
	const aggs = getAggs(req, price, filterBoolean, filter)

	const result = await elasticSearch({
		req: req,
		unisex: unisex,
		aggs: aggs,
		from: null,
		size: 0,
		sort: null,
		filter: null,
		filterBoolean: null,
		func: 'search',
	})
	let params = {}
	if (filterBoolean) {
		const resultAggs = [
			result.aggregations.inavtive,
			result.aggregations.pol,
			result.aggregations.kategoriya,
			result.aggregations.tsvet,
			result.aggregations.razmer,
			result.aggregations.brand,
		]
		resultAggs.forEach(el => {
			for (key in el) {
				if (typeof el[key] == 'object') {
					params[key] = el[key]
				}
			}
		})
	} else {
		params = result.aggregations
	}
	res.send(params)
}

module.exports = getFilter
