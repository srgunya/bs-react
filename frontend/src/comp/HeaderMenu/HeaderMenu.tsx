import cn from 'classnames'
import { useContext } from 'react'
import { HeaderContext } from '../../context/header.context'
import { HeaderMenuBlock } from '../HeaderMenu__block/HeaderMenuBlock'
import styles from './HeaderMenu.module.scss'
import { access } from './HeaderMenu.params.access'
import { brand } from './HeaderMenu.params.brand'
import { man } from './HeaderMenu.params.man'
import { news } from './HeaderMenu.params.news'
import { sale } from './HeaderMenu.params.sale'
import { woman } from './HeaderMenu.params.woman'

export default function HeaderMenu() {
	const { menuActive, setMenuActive } = useContext(HeaderContext)

	return (
		<nav
			className={cn(styles['menuWrap'], {
				[styles['menuWrap_open']]: menuActive != '',
			})}
			onMouseLeave={() => setMenuActive('')}
		>
			<HeaderMenuBlock params={news} name='Новинки' />
			<HeaderMenuBlock params={brand} name='Бренды' />
			<HeaderMenuBlock params={man} name='Мужское' />
			<HeaderMenuBlock params={woman} name='Женское' />
			<HeaderMenuBlock params={access} name='Аксессуары' />
			<HeaderMenuBlock params={sale} name='Скидки' />
		</nav>
	)
}
