const {
	getUnisex,
	getBlockFilter,
	getBooleanFilter,
} = require('../helpers/elasticConst')
const { elasticSearch } = require('./elasticSearch')

async function getPagination(req, res) {
	const unisex = getUnisex(req)
	const filter = getBlockFilter(req)
	const filterBoolean = getBooleanFilter(req)

	const result = await elasticSearch({
		req: req,
		unisex: unisex,
		aggs: null,
		from: null,
		size: null,
		sort: null,
		filter: filter,
		filterBoolean: filterBoolean,
		func: 'count',
	})
	res.send(`${result.count}`)
}

module.exports = getPagination
