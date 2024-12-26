import { header_nav } from '../comp/Header__nav/HeaderNav.params'
import { access } from '../comp/HeaderMenu/HeaderMenu.params.access'
import { brand } from '../comp/HeaderMenu/HeaderMenu.params.brand'
import { man } from '../comp/HeaderMenu/HeaderMenu.params.man'
import { news } from '../comp/HeaderMenu/HeaderMenu.params.news'
import { sale } from '../comp/HeaderMenu/HeaderMenu.params.sale'
import { woman } from '../comp/HeaderMenu/HeaderMenu.params.woman'

export function allLink() {
	const links: string[] = []
	header_nav.forEach(el => links.push(el.to))
	function push(arr: { [key: string]: { to: string }[] }[]) {
		arr.forEach(obj => {
			for (const key in obj) {
				obj[key].forEach(el => links.push(el.to))
			}
		})
	}
	push([access, brand, man, news, sale, woman])
	return links
}
