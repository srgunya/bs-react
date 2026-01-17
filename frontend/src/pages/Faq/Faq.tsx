import { Link } from 'react-router-dom'
import { ListNav } from '../../comp/List__nav/ListNav'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import styles from './Faq.module.scss'
import { faq } from './Faq.params'

export function Faq() {
	const mainRef = useLoadPage()

	function createBlock(arr: typeof faq) {
		return arr.map(el => {
			return (
				<Link to={el.to} className={styles['block']} key={el.h1}>
					<picture className={styles['block__pic']}>
						<img src={el.img} />
					</picture>
					<h1 className={styles['block__h1']}>{el.h1}</h1>
					<p className={styles['block__p']}>{el.p}</p>
				</Link>
			)
		})
	}
	return (
		<div className={'main'} ref={mainRef}>
			<div className={'sideBar'}>
				<ListNav params={['Помощь покупателю']} />
			</div>
			<div className={styles['table']}>{createBlock(faq)}</div>
		</div>
	)
}
