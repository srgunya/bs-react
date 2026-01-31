import { PREFIX } from '../helpers/API'
import { PageData } from '../interfaces/page.interface'

export async function getDataPage(url: string) {
	const res = await fetch(`${PREFIX}/${url}`)
	const data: PageData[] = await res.json()
	return data
}
