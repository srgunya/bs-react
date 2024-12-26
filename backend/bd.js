require('dotenv').config()
const bs = require('./helpers/mysql')
const client = require('./helpers/elk')

async function load() {
	try {
		await deleteIndex('bs_item')
		await deleteIndex('bs_logo')
		await createItemIndex()
		await createLogoIndex()
		await loadIndex('item', 'bs_item')
		await loadIndex('logo', 'bs_logo')
	} catch (error) {
		console.error(error)
		await createItemIndex()
		await createLogoIndex()
		await loadIndex('item', 'bs_item')
		await loadIndex('logo', 'bs_logo')
	}
}

async function deleteIndex(index_name) {
	const response = await client.indices.delete({
		index: index_name,
	})
	if (!response.err) {
		console.log('Удалили индекс')
	}
}

async function loadIndex(name_mysql, name_elk) {
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
	const response = await client.indices.create({
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
	if (!response.err) {
		console.log('Создали индекс')
	}
}
async function createItemIndex() {
	const response = await client.indices.create({
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
					list_prop: {
						type: 'text',
						analyzer: 'all_prop_analyzer',
					},
					id: {
						type: 'keyword',
					},
					brand: {
						type: 'text',
						copy_to: ['list_prop'],
						analyzer: 'brand_analyzer',
						fields: {
							keyword: {
								type: 'keyword',
							},
						},
					},
					class: {
						type: 'keyword',
						copy_to: ['list_prop'],
					},
					category: {
						type: 'keyword',
						copy_to: ['list_prop'],
					},
					type: {
						type: 'keyword',
						copy_to: ['list_prop'],
					},
					sex: {
						type: 'keyword',
						copy_to: ['list_prop'],
					},
					model: {
						type: 'keyword',
					},
					color: {
						type: 'keyword',
					},
					size: {
						type: 'keyword',
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
	if (!response.err) {
		console.log('Создали индекс')
	}
}
load()
