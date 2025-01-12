import cn from 'classnames'
import { MouseEvent, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ListContext } from '../../context/list.context'
import styles from './ListNav.module.scss'
import { ListNavProps } from './ListNav.props'

export function ListNav({ params, brand }: ListNavProps) {
	const [linkBrand, setLinkBrand] = useState(brand)
	const { setListState } = useContext(ListContext)
	const location = useLocation()
	const ulRef = useRef<HTMLUListElement>(null)
	const [searchParams] = useSearchParams()
	const navi = useNavigate()

	useLayoutEffect(() => {
		if (brand) {
			setLinkBrand(brand)
		}
	}, [brand])

	useLayoutEffect(() => {
		ulRef.current?.childNodes.forEach(el => {
			el.childNodes.forEach(el => {
				if (el instanceof Element && el.classList.contains(styles['nav__link'])) {
					el.classList.add(styles['nav__link_transition-none'])
				}
			})
		})
	}, [params])

	useEffect(() => {
		ulRef.current?.childNodes.forEach(el => {
			el.childNodes.forEach(el => {
				if (el instanceof Element && el.classList.contains(styles['nav__link'])) {
					el.classList.remove(styles['nav__link_transition-none'])
				}
			})
		})
	}, [params])

	function link(e: MouseEvent, to: string) {
		e.preventDefault()
		if (location.pathname == to && !searchParams.size) {
			return false
		} else {
			setListState({ lazy: true, loading: true })
			navi(to)
		}
	}

	function createUl() {
		return (
			<ul className={styles['nav__ul']} ref={ulRef}>
				<li className={styles['nav__li']}>
					<Link to='/' className={styles['nav__link']}>
						Главная
					</Link>
				</li>
				{params.map((el, i) => (
					<li key={i} className={styles['nav__li']}>
						<span className={styles['nav__span']}>/</span>
						<Link
							to={''}
							className={cn(styles['nav__link'], {
								[styles['nav__link_active']]: i == params.length - 1,
							})}
							onClick={e => {
								const to =
									i == params.length - 1
										? location.pathname
										: location.pathname.split('/').filter(el => el != '')[i] + '/'
								link(e, to)
							}}
						>
							{el == 'sale'
								? 'Скидки'
								: el == 'new'
								? 'Новинки'
								: /[a-zA-Z]/.test(el)
								? linkBrand
								: el}
						</Link>
					</li>
				))}
			</ul>
		)
	}
	return <div className={styles['nav']}>{createUl()}</div>
}
