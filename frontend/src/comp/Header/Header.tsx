import { Link } from 'react-router-dom'
import { HeaderButton } from '../Header__button/HeaderButton'
import { HeaderNav } from '../Header__nav/HeaderNav'
import styles from './Header.module.scss'

export function Header() {
	return (
		<header className={styles['header']}>
			<div className={styles['headerSale']}>
				<Link to='/sale/' className={styles['headerSale__a']}>
					SALE
				</Link>
			</div>
			<div className={styles['headerCont']}>
				<Link to='/' className={styles['HeaderLogo']}>
					<picture className={styles['HeaderLogo__img']}>
						<img src='/img/header/logo.svg' className={styles['HeaderLogo__img']} />
					</picture>
				</Link>
				<HeaderNav />
				<HeaderButton />
			</div>
		</header>
	)
}
