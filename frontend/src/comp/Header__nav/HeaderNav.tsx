import { MouseEvent, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HeaderContext } from '../../context/header.context'
import { HeaderNavProps } from './HeaderNam.props'
import styles from './HeaderNav.module.scss'
import { header_nav } from './HeaderNav.params'

export function HeaderNav({ link }: HeaderNavProps) {
	const { menuActive, setMenuActive } = useContext(HeaderContext)
	const nav = useRef<HTMLElement>(null)

	useEffect(() => {
		if (menuActive === '') {
			clearHover()
		}
	}, [menuActive])

	function showMenu(e: MouseEvent) {
		if (e.target instanceof Element) {
			clearHover()
			e.target.parentElement?.classList.add(styles['headerNav__li_active'])
			setMenuActive(e.target.innerHTML)
		}
	}

	function closeMenu(e: MouseEvent) {
		if (e.relatedTarget instanceof Element) {
			if (e.relatedTarget.classList.contains('menu_active')) {
				return false
			}
			setMenuActive('')
		}
	}

	function clearHover() {
		nav.current?.firstChild?.childNodes.forEach(i => {
			if (i instanceof Element) {
				i.classList.remove(styles['headerNav__li_active'])
			}
		})
	}

	return (
		<nav className={styles['headerNav']} onMouseOver={showMenu} onMouseLeave={closeMenu} ref={nav}>
			<ul className={styles['headerNav__ul']}>
				{header_nav.map(el => (
					<li className={styles['headerNav__li']} key={el.text}>
						<Link
							to={el.to}
							className={styles['headerNav__a']}
							onClick={e => {
								link(e, el.to)
							}}
						>
							{el.text}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
