import { MouseEvent, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { HeaderContext } from '../../context/header.context'
import { listActions } from '../../store/list.slice'
import { AppDispatch } from '../../store/store'
import { HeaderButton } from '../Header__button/HeaderButton'
import { HeaderNav } from '../Header__nav/HeaderNav'
import styles from './Header.module.scss'

export function Header() {
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const navi = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const { setMenuActive } = useContext(HeaderContext)

	function link(e: MouseEvent, to: string) {
		e.preventDefault()
		setMenuActive('')
		if (location.pathname == to && !searchParams.size) {
			return false
		} else {
			dispatch(listActions.change({ lazy: true, loading: true }))
			navi(to)
		}
	}

	function linkLogo(e: MouseEvent) {
		e.preventDefault()
		if (location.pathname == '/') {
			return false
		} else {
			navi('/')
		}
	}

	return (
		<header className={styles['header']}>
			<div className={styles['headerSale']}>
				<Link
					to='/sale/'
					className={styles['headerSale__a']}
					onClick={e => {
						link(e, '/sale/')
					}}
				>
					SALE
				</Link>
			</div>
			<div className={styles['headerCont']}>
				<Link
					to='/'
					className={styles['HeaderLogo']}
					onClick={e => {
						linkLogo(e)
					}}
				>
					<picture className={styles['HeaderLogo__img']}>
						<img src='/img/header/logo.svg' className={styles['HeaderLogo__img']} />
					</picture>
				</Link>
				<HeaderNav link={link} />
				<HeaderButton />
			</div>
		</header>
	)
}
