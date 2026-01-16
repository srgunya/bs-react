import { Params } from 'react-router-dom'
import { PREFIX } from '../helpers/API'
import { translitToRus } from '../helpers/translitToRus'
import { filterData, filterParamsType } from '../interfaces/filter.interface'
import { itemData } from '../interfaces/item.interface'

export async function getParams(url: string) {
	const words = url
		.split('/')
		.filter(el => el != '')
		.map(el => el.replace(/-/gi, ' '))

	async function isTranslit(el: string) {
		const res = await fetch(`${PREFIX}/getParams/${el}`)
		const data = await res.text()
		return data
	}
	async function getData() {
		const data = await Promise.all(words.map(el => isTranslit(el)))
		return data
	}
	const count = await getData()

	const wordNotTranslit: string[] = []
	const wordIsTranslit = words.filter((el, i) =>
		count[i] == '0' && words[i] != 'sale' && words[i] != 'new'
			? true
			: wordNotTranslit.push(el) && false,
	)
	const wordIsRus = wordIsTranslit.map(el => translitToRus(el))

	return [...wordIsRus, ...wordNotTranslit].sort(function (x, y) {
		return x == 'sale' ? -1 : y == 'sale' ? 1 : 0
	})
}

export async function getList(
	props: string[],
	page: number,
	limit: number,
	sort: string,
	filterParams: filterParamsType,
) {
	const res = await fetch(
		`${PREFIX}/getList/${props.join(' ')}/${page}/${limit}/${sort}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(filterParams),
		},
	)
	const data: itemData[] = await res.json()
	return data
}

export async function getFilter(
	props: string[],
	filterParams: filterParamsType,
) {
	const res = await fetch(`${PREFIX}/getFilter/${props.join(' ')}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(filterParams),
	})
	const filter: filterData = await res.json()
	return { filter, notFound: !res.ok }
}

export async function getPagination(
	props: string[],
	filterParams: filterParamsType,
) {
	const res = await fetch(`${PREFIX}/getPagination/${props.join(' ')}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(filterParams),
	})
	const data = await res.text()
	return Number(data)
}

export async function getSearchParams(
	params: Params<string>,
	request: Request,
) {
	const props: string[] = await getParams(
		typeof params['*'] == 'string' ? params['*'] : '',
	)
	const searchParams = new URL(request.url).searchParams
	const page =
		Number.isInteger(Number(searchParams.get('page'))) &&
		Number(searchParams.get('page')) > 0
			? Number(searchParams.get('page'))
			: 1
	const limit =
		Number(searchParams.get('limit')) == 40
			? 40
			: Number(searchParams.get('limit')) == 80
				? 80
				: 20
	const sort =
		searchParams.get('sort') == 'priceASC'
			? 'priceASC'
			: searchParams.get('sort') == 'priceDESC'
				? 'priceDESC'
				: 'default'

	const orderPrice = searchParams
		.get('price')
		?.split(',')
		.map(el => {
			if (!isNaN(Number(el))) {
				return Math.abs(Math.round(Number(el)))
			}
		})
		.filter(el => el)
	const price = (orderPrice?.length == 2 ? orderPrice : []) as number[]
	const pol = searchParams.get('pol')?.split(',') ?? []
	const kategoriya = searchParams.get('kategoriya')?.split(',') ?? []
	const tsvet = searchParams.get('tsvet')?.split(',') ?? []
	const razmer = searchParams.get('razmer')?.split(',') ?? []
	const brand = searchParams.get('brand')?.split(',') ?? []
	const filterParams = {
		price,
		pol,
		kategoriya,
		tsvet,
		razmer,
		brand,
	}
	return { props, page, limit, sort, filterParams }
}
