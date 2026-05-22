import cn from 'classnames'
import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import styles from './HeaderMenuImg.module.scss'
import { HeaderMenuImgProps } from './HeaderMenuImg.props'

export function HeaderMenuImg({ name, img, link }: HeaderMenuImgProps) {
	function createImg() {
		return img.map(i => (
			<Link
				to={i.to}
				key={i.text}
				className={cn(styles['menuImg__a'], {
					[styles['menuImg__a_brand']]: name === 'Бренды',
					[styles['menuImg__a_sex']]: name === 'Мужское' || name === 'Женское',
				})}
				onClick={e => {
					link(e, i.to)
				}}
			>
				<picture className={styles['menuImg__img']}>
					<img src={PREFIX + i.img} className={styles['menuImg__img']} />
				</picture>
				<span className={styles['menuImg__span']}>{i.text}</span>
			</Link>
		))
	}

	return <>{createImg()}</>
}
