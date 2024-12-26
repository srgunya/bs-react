const client = require('../helpers/elk')
const {
	getUnisex,
	getPrice,
	getSort,
	getBlockFilter,
	getBooleanFilter,
} = require('../helpers/elasticConst')
const { elasticSearch } = require('./elasticSearch')

async function getList(req, res) {
	const size = req.params['page'] > 100 ? 0 : req.params['limit']
	const skip = req.params['page'] > 100 ? 0 : size * (Number(req.params['page']) - 1)
	const unisex = getUnisex(req)
	const price = getPrice()
	const sort = getSort(req, price)
	const filter = getBlockFilter(req)
	const filterBoolean = getBooleanFilter(req)

	let result = await elasticSearch({
		req: req,
		unisex: unisex,
		aggs: null,
		from: skip,
		size: size,
		sort: sort,
		filter: filter,
		filterBoolean: filterBoolean,
		func: 'search',
	})
	result = result.hits.hits.map(el => el._source)
	res.send(result)
}

module.exports = getList
