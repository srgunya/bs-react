import { Link } from 'react-router-dom'
import { ListNav } from '../../comp/List__nav/ListNav'
import styles from './Faq.module.scss'
import { faq } from './Faq.params'
import { FaqProps } from './Faq.props'

export function Faq() {
	function createBlock(faq: FaqProps[]) {
		return faq.map(el => {
			return (
				<Link to='' className={styles['block']} key={el.h1}>
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
		<div className={'main'}>
			<div className={'sideBar'}>
				<ListNav params={['Помощь покупателю']} brand={''} />
			</div>
			<div className={styles['table']}>{createBlock(faq)}</div>
		</div>
	)
}
