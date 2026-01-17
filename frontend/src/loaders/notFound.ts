import { PREFIX } from '../helpers/API'

export async function notFound() {
	return await fetch(`${PREFIX + '/get404'}`)
}
