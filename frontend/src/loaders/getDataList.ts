import { itemData } from '../comp/Index__slider_item/IndexSliderItem.props'
import { PREFIX } from '../helpers/API'

export async function isTranslit(url: string) {
	const words = url
		.split('/')
		.filter(el => el != '')
		.map(el => el.replace(/-/gi, ' '))

	async function getCount(el: string) {
		const res = await fetch(`${PREFIX}/isTranslit/${el}`)
		const data = await res.text()
		return data
	}
	async function getData() {
		const data = await Promise.all(words.map(el => getCount(el)))
		return data
	}
	const count = await getData()

	const wordNotTranslit: string[] = []
	const wordIsTranslit = words.filter((el, i) =>
		count[i] == '0' && words[i] != 'sale' && words[i] != 'new'
			? true
			: wordNotTranslit.push(el) && false
	)
	const wordIsRus = wordIsTranslit.map(el => translitToRus(el))

	return [...wordIsRus, ...wordNotTranslit].sort(function (x, y) {
		return x == 'sale' ? -1 : y == 'sale' ? 1 : 0
	})
}

export async function getItems(props: string[], page: number) {
	const res = await fetch(`${PREFIX}/getList/${props.join(' ')}/${page}`)
	const data: itemData[] = await res.json()
	return data
}

export async function pagination(props: string[]) {
	const res = await fetch(`${PREFIX}/pagination/${props.join(' ')}`)
	const data = await res.text()
	return data
}

function translitToRus(word: string) {
	const converter = {
		obuv: 'обувь',
		bele: 'белье',
		ashi: 'ащи',
		yo: 'ё',
		zh: 'ж',
		ch: 'ч',
		sh: 'ш',
		yu: 'ю',
		ya: 'я',
		a: 'а',
		b: 'б',
		v: 'в',
		g: 'г',
		d: 'д',
		e: 'е',
		z: 'з',
		i: 'и',
		j: 'й',
		k: 'к',
		l: 'л',
		m: 'м',
		n: 'н',
		o: 'о',
		p: 'п',
		r: 'р',
		s: 'с',
		t: 'т',
		u: 'у',
		f: 'ф',
		h: 'х',
		c: 'ц',
		y: 'ы',
	}
	for (const [key, value] of Object.entries(converter)) {
		word = word.replaceAll(key, value)
	}
	return word
}
