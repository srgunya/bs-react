import { MouseEvent, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HeaderContext } from '../../context/header.context'
import { useLink } from '../../hooks/use-link.hook'
import { HeaderButton } from '../Header__button/HeaderButton'
import { HeaderNav } from '../Header__nav/HeaderNav'
import styles from './Header.module.scss'

export function Header() {
	const location = useLocation()
	const navi = useNavigate()
	const { setMenuActive } = useContext(HeaderContext)
	const linkTo = useLink()

	function link(e: MouseEvent, to: string) {
		setMenuActive('')
		linkTo(e, to)
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
						<img
							src='/img/header/logo.svg'
							className={styles['HeaderLogo__img']}
						/>
					</picture>
				</Link>
				<HeaderNav link={link} />
				<HeaderButton />
			</div>
		</header>
	)
}
