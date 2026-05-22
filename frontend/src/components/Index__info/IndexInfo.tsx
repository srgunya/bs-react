import cn from 'classnames'
import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import styles from './IndexInfo.module.scss'
import { info } from './IndexInfo.params'

export function IndexInfo() {
	return (
		<div className={styles['info']}>
			{info.map((el, i) => (
				<div
					className={cn(styles['info__item'], {
						[styles['info__item_first']]: i === 0,
					})}
					key={i}
				>
					<Link to={el.to} className={styles['info__link']}>
						<picture
							className={cn('wrap_tr', {
								[styles['info__pic_big']]: i == 0,
								[styles['info__pic_smal']]: i != 0,
							})}
						>
							<img
								src={PREFIX + el.img}
								alt=''
								className={styles['info__img'] + ' img_tr'}
							/>
						</picture>
					</Link>
					<div className={styles['info__block']}>
						<Link to={el.to}>
							<h1 className={styles['info__h1']}>{el.h1}</h1>
						</Link>
						<p className={styles['info__p']}>{el.text}</p>
						<Link to={el.to}>
							<span className={styles['info__span']}>{el.link}</span>
						</Link>
					</div>
				</div>
			))}
		</div>
	)
}
