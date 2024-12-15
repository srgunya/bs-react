import cn from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import styles from './ListNav.module.scss'
import { ListNavProps } from './ListNav.props'

export function ListNav({ params, brand }: ListNavProps) {
	const location = useLocation()
	function createUl() {
		return (
			<ul className={styles['listNav__ul']}>
				<li className={styles['listNav__li']}>
					<Link to='/' className={styles['listNav__link']}>
						Главная
					</Link>
				</li>
				{params.map((el, i) => (
					<li key={i} className={styles['listNav__li']}>
						<span className={styles['listNav__span']}>/</span>
						<Link
							to={
								i == params.length - 1
									? location.pathname
									: location.pathname.split('/').filter(el => el != '')[i] + '/'
							}
							className={cn(styles['listNav__link'], {
								[styles['listNav__link_active']]: i == params.length - 1,
							})}
						>
							{el == 'sale' ? 'Скидки' : el == 'new' ? 'Новинки' : /[a-zA-Z]/.test(el) ? brand : el}
						</Link>
					</li>
				))}
			</ul>
		)
	}
	return <div className={styles['listNav']}>{createUl()}</div>
}
