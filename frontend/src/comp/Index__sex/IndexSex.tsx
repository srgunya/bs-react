import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import styles from './IndexSex.module.scss'

export function IndexSex() {
	const index_sex = [
		{ to: '', text: 'Мужское', img: `${PREFIX}/img/index-sex/men_home.jpg` },
		{ to: '', text: 'Женское', img: `${PREFIX}/img/index-sex/women_home.jpg` },
	]

	return (
		<div className={styles['sex']}>
			{index_sex.map((el, i) => (
				<Link to={el.to} className={styles['sex__link']} key={i}>
					<picture className={styles['sex__pic'] + ' wrap_tr'}>
						<img src={el.img} alt='' className={styles['sex__img'] + ' img_tr'} />
					</picture>
					<div className={styles['sex__block']}>
						<span className={styles['sex__span']}>{el.text}</span>
					</div>
				</Link>
			))}
		</div>
	)
}
