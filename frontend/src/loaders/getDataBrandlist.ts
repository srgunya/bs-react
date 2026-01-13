import { soon } from '../comp/Brandlist__table/BrandlistTable.params'
import { PREFIX } from '../helpers/API'
import { brandListData } from '../interfaces/brandList.interface'

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
		const brands = await getBrands()
		const table: brandListData = {}
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
