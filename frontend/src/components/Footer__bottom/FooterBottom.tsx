import { Link } from 'react-router-dom'
import { useLink } from '../../hooks/use-link.hook'
import styles from './FooterBottom.module.scss'
import { copy, icons } from './FooterBottom.params'
export function FooterBottom() {
	const linkTo = useLink()

	return (
		<div className={styles['footerBottom']}>
			<ul className={styles['footerIcons']}>
				{icons.map((el, i) => (
					<li key={i}>
						<picture className={styles['footerIcons__img']}>
							<img src={el.img} className={styles['footerIcons__img']} />
						</picture>
					</li>
				))}
			</ul>
			<ul className={styles['footerCopy']}>
				<li className={styles['footerCopy__item']}>© BRANDSHOP, 2024</li>
				{copy.map((el, i) => (
					<li className={styles['footerCopy__item']} key={i}>
						<Link
							to={el.to}
							onClick={e => {
								linkTo(e, el.to)
							}}
							className={styles['footerCopy__link']}
						>
							{el.text}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
