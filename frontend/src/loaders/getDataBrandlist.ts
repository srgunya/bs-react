import { soon } from '../comp/Brandlist__table/BrandlistTable.params'
import { PREFIX } from '../helpers/API'

export async function getDataBrandlist(func: string) {
	const lang = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

	if (func == 'lang') {
		return lang
	} else if (func == 'table') {
		async function getBrands() {
			const res = await fetch(`${PREFIX}/getBrands`)
			const data: string[] = await res.json()
			return data
		}
		const brands: string[] = await new Promise(resolve => {
			setTimeout(() => {
				getBrands().then(data => {
					resolve(data)
				})
			}, 300)
		})
		const table = {} as {
			[key: string]: string[]
		}
		lang.split('').forEach(el => {
			table[el] = []
		})
		brands.concat(soon.split(',')).forEach(brand => {
			Object.keys(table).forEach(letter => {
				if (brand.charAt(0).toLowerCase() == letter.toLowerCase()) {
					table[letter].push(brand)
				}
			})
		})

		return table
	}
}
