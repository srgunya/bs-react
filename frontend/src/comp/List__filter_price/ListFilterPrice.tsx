import { RangeSlider } from '../RangeSlider/RangeSlider'
import styles from './ListFilterPrice.module.scss'
export function ListFilterPrice() {
	return (
		<div className={styles['filterPrice']}>
			<div className={styles['filterPrice__block']}>
				<span className={styles['filterPrice__span']}>От</span>
				<div className={styles['filterPrice__input_wrap']}>
					<input type='text' className={styles['filterPrice__input']} placeholder='1 123' />
				</div>
			</div>
			<div className={styles['filterPrice__block']}>
				<span className={styles['filterPrice__span']}>До</span>
				<div className={styles['filterPrice__input_wrap']}>
					<input type='text' className={styles['filterPrice__input']} placeholder='1 123' />
				</div>
			</div>
			<RangeSlider />
		</div>
	)
}
