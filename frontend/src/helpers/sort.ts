type arr = {
	to: string
	text: string
}[]

export function sortHeader(arr: arr) {
	return arr.sort((a, b) => {
		if (
			a.text == 'Все бренды' ||
			a.text == 'Все категории' ||
			b.text == 'Все бренды' ||
			b.text == 'Все категории'
		) {
			return 0
		} else {
			if (a.text.toLowerCase() < b.text.toLowerCase()) {
				return -1
			}
			if (a.text.toLowerCase() > b.text.toLowerCase()) {
				return 1
			}
			return 0
		}
	})
}

export function sortByAlphabet(arr: string[]) {
	const order = ['Мужской', 'Женский', 'Унисекс']
	return arr
		.sort((a, b) => {
			if (a.toLowerCase() < b.toLowerCase()) {
				return -1
			}
			if (a.toLowerCase() > b.toLowerCase()) {
				return 1
			}
			return 0
		})
		.sort((a, b) => order.indexOf(a) - order.indexOf(b))
}

export function sortSize(arr: string[]) {
	const US = arr
		.filter(el => {
			if (el.indexOf('US') > 0) {
				return el
			}
		})
		.sort((a, b) => parseInt(a) - parseInt(b))
	const EU = arr
		.filter(el => {
			if (el.indexOf('EU') > 0) {
				return el
			}
		})
		.sort()
	const number = arr
		.filter(el => {
			if (Number(el)) {
				return el
			}
		})
		.sort()
	const order = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL']
	const string = arr
		.filter(el => !US.includes(el) && !EU.includes(el) && !number.includes(el))
		.sort((a, b) => order.indexOf(a) - order.indexOf(b))
	return [...string, ...US, ...EU, ...number]
}
