require('dotenv').config()
const bs = require('./controllers/mysql')
const client = require('./controllers/elk')

function load() {
	createItemIndex()
	createLogoIndex()
	loadIndex('item', 'bs_item')
	loadIndex('logo', 'bs_logo')
}

function loadIndex(name_mysql, name_elk) {
	let mas_for_elk = []
	let query = `SELECT * FROM ${name_mysql}`
	bs.query(query, async (err, result, field) => {
		await result
			.map(el => {
				if ('size' in el) {
					el.size = el.size.split(',')
				}
				return el
			})
			.forEach(el => {
				mas_for_elk.push({
					index: {
						_index: `${name_elk}`,
						_id: el.id,
					},
				})
				mas_for_elk.push(el)
			})
		const response = await client.bulk({
			body: mas_for_elk,
		})
		if (!response.err) {
			console.log('Успешно загрузили данные')
		}
	})
}
async function createLogoIndex() {
	return await client.indices.create({
		index: 'bs_logo',
		body: {
			mappings: {
				properties: {
					id: {
						type: 'keyword',
					},
					brand: {
						type: 'keyword',
					},
					logo: {
						type: 'keyword',
						index: false,
					},
				},
			},
		},
	})
}
async function createItemIndex() {
	return await client.indices.create({
		index: 'bs_item',
		body: {
			settings: {
				analysis: {
					char_filter: {
						my_char_filter: {
							type: 'mapping',
							mappings: ['. =>', '- => \\u0020', '& =>', '\\u0020&\\u0020 => \\u0020'],
						},
					},
					analyzer: {
						all_prop_analyzer: {
							type: 'custom',
							char_filter: ['my_char_filter'],
							filter: ['lowercase'],
							tokenizer: 'standard',
						},
						brand_analyzer: {
							type: 'custom',
							char_filter: ['my_char_filter'],
							filter: ['lowercase'],
							tokenizer: 'keyword',
						},
					},
				},
			},
			mappings: {
				properties: {
					all_prop: {
						type: 'text',
						analyzer: 'all_prop_analyzer',
					},
					list_prop: {
						type: 'text',
						analyzer: 'all_prop_analyzer',
					},
					id: {
						type: 'keyword',
						copy_to: 'all_prop',
					},
					brand: {
						type: 'text',
						copy_to: ['all_prop', 'list_prop'],
						analyzer: 'brand_analyzer',
						fields: {
							keyword: {
								type: 'keyword',
							},
						},
					},
					class: {
						type: 'keyword',
						copy_to: ['all_prop', 'list_prop'],
					},
					category: {
						type: 'keyword',
						copy_to: ['all_prop', 'list_prop'],
					},
					type: {
						type: 'keyword',
						copy_to: ['all_prop', 'list_prop'],
					},
					sex: {
						type: 'keyword',
						copy_to: ['all_prop', 'list_prop'],
					},
					model: {
						type: 'keyword',
						copy_to: 'all_prop',
					},
					color: {
						type: 'keyword',
						copy_to: 'all_prop',
					},
					size: {
						type: 'keyword',
						copy_to: 'all_prop',
					},
					info: {
						type: 'keyword',
						index: false,
					},
					img: {
						type: 'keyword',
						index: false,
					},
					photo: {
						type: 'keyword',
						index: false,
					},
					sale: {
						type: 'float',
						index: false,
					},
					price: {
						type: 'float',
						index: false,
					},
				},
			},
		},
	})
}
load()
