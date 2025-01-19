import cn from 'classnames'
import styles from './Lable.module.scss'
import { LableProps } from './Lable.props'
export function Lable({ className, price }: LableProps) {
	return (
		<button className={cn(styles['lable'], className)}>
			<div className={styles['lable__block']}>
				<div className={styles['lable__price']}>
					<span className={styles['lable__span']}>по {price.toLocaleString('ru-RU') + ' ₽'}</span>{' '}
					x4 платежами
				</div>
				<span className={styles['lable__partners']}>с партнерами BRANSHOP</span>
			</div>
			<div className={styles['lable__details']}>Подробнее</div>
		</button>
	)
}
