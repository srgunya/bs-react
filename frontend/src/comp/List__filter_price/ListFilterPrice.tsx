import { RangeSlider } from '../RangeSlider/RangeSlider'
import styles from './ListFilterPrice.module.scss'
export function ListFilterPrice() {
	function createPriceBlock(text: string) {
		return (
			<div className={styles['filterPrice__block']}>
				<span className={styles['filterPrice__span']}>{text}</span>
				<div className={styles['filterPrice__input_wrap']}>
					<input type='text' className={styles['filterPrice__input']} placeholder='1 123' />
				</div>
			</div>
		)
	}
	return (
		<div className={styles['filterPrice']}>
			{createPriceBlock('От')}
			{createPriceBlock('До')}
			<RangeSlider />
		</div>
	)
}
