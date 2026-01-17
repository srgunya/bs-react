import { PREFIX } from '../helpers/API'
import { faqIdData } from '../interfaces/faqId.interface'

export async function getDataFaqId(url: string) {
	const res = await fetch(`${PREFIX}/${url}`)
	const data: faqIdData[] = await res.json()
	return data
}
