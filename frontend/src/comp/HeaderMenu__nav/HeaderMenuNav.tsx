import cn from 'classnames'
import { Link } from 'react-router-dom'
import styles from './HeaderMenuNav.module.scss'
import { HeaderMenuNavProps } from './HeaderMenuNav.props'

export function HeaderMenuNav({ name, ul, link }: HeaderMenuNavProps) {
	function sortHeader(arr: typeof ul) {
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

	function createUl() {
		return (
			<ul className={styles['menuNav__ul']}>
				{sortHeader(ul).map((el, i, arr) => (
					<li
						key={el.text}
						className={cn({
							[styles['menuNav__li_capital']]: arr.length === 14 && i === 0,
							[styles['menuNav__li_brand']]: name === 'Бренды' && arr.length < 14 && i === 0,
						})}
					>
						<Link
							to={el.to}
							className={cn(styles['menuNav__a'], {
								[styles['menuNav__a_capital']]: arr.length === 14 && i === 0,
							})}
							onClick={e => {
								link(e, el.to)
							}}
						>
							{el.text}
						</Link>
					</li>
				))}
			</ul>
		)
	}
	return <>{createUl()}</>
}
