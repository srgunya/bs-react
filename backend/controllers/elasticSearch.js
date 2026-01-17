const client = require('../helpers/elk')

async function elasticSearch(body) {
	const { req, unisex, aggs, from, size, sort, filter, filterBoolean, func } =
		body

	const uni = unisex?.replace('sale', '').trim()
	const params = req.params['props']?.replace('sale', '').trim()

	const query =
		req.params['props']?.includes('sale') && req.params['props']?.length > 4
			? {
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
													query: uni,
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
						...(filterBoolean && { filter: filter }),
					},
				}
			: req.params['props'] == 'new' || req.path == '/getBrands'
				? {
						bool: {
							must: [{ match_all: {} }],
							...(filterBoolean && { filter: filter }),
						},
					}
				: req.params['props'] == 'sale'
					? {
							bool: {
								must: [
									{
										range: {
											sale: {
												gt: 0,
											},
										},
									},
								],
								...(filterBoolean && { filter: filter }),
							},
						}
					: {
							bool: {
								must: [
									{
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
								],
								...(filterBoolean && { filter: filter }),
							},
						}

	return await client[func]({
		index: 'bs_item',
		...(from && {
			from: from,
		}),
		...(size && {
			size: size,
		}),
		query: query,
		...(aggs && {
			aggs: aggs,
		}),
		...(sort && {
			sort: sort,
		}),
	})
}

module.exports = { elasticSearch }
