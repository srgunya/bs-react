import styles from './IndexItemPrice.module.scss'
import { ListItemsPriceProps } from './IndexItemPrice.props'

export function IndexItemPrice({ price }: ListItemsPriceProps) {
	return (
		<span className={styles['item__price']}>
			{price.toLocaleString('ru-RU') + ' ₽'}
		</span>
	)
}

export function IndexItemSale({ price, sale = 0 }: ListItemsPriceProps) {
	const salePrice = Math.round(price - (price * sale) / 100)
	return (
		<div className={styles['itemSale']}>
			<div className={styles['itemSale__block']}>
				<span className={styles['itemSale__price']}>
					{price.toLocaleString('ru-RU') + ' ₽'}
				</span>
				<span className={styles['itemSale__percent']}>{'–' + sale + '%'}</span>
			</div>
			<span className={styles['itemSale__sale']}>
				{salePrice.toLocaleString('ru-RU') + ' ₽'}
			</span>
		</div>
	)
}
