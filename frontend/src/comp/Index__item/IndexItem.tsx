import cn from 'classnames'
import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import { IndexItemPrice, IndexItemSale } from '../Index__item_price/IndexItemPrice'
import { ListItemsSize } from '../List__items_size/ListItemsSize'
import styles from './IndexItem.module.scss'
import { IndexItemProps } from './IndexItem.props'

export function IndexItem({ item, name }: IndexItemProps) {
	function createItem() {
		const price = item.sale ? (
			<IndexItemSale price={item.price} sale={item.sale} />
		) : (
			<IndexItemPrice price={item.price} />
		)
		let split: number | string = item.sale
			? Math.round((item.price - (item.price * item.sale) / 100) / 4)
			: Math.round(item.price / 4)
		split = split.toLocaleString('ru-RU') + ' ₽'
		return (
			<Link
				to=''
				className={cn(styles['item__link'], {
					[styles['item__link_index']]: name != 'list',
				})}
			>
				<div className={styles['item__cont']}>
					<picture className={styles['item__pic'] + ' wrap_tr'}>
						<img src={PREFIX + item.img} alt='' className={cn(styles['item__img'], 'img_tr')} />
					</picture>
					<span className={styles['item__brand']}>{item.brand}</span>
					<span className={styles['item__type']}>{item.type}</span>
					<span className={styles['item__model']}>{item.model}</span>
					{price}
					{name == 'list' && (
						<>
							<div className={styles['item__split']}>
								<span className={styles['item__split_span']}>по {split}&nbsp;</span>
								x4 платежами
							</div>
							<span className={styles['item__signature']}>с партнёрами BRANDSHOP</span>
						</>
					)}
				</div>
				{name == 'list' && (
					<div
						className={cn(styles['itemSize'], {
							[styles['itemSize_center']]: item.size.length < 4,
						})}
					>
						{item.size.map(el => (
							<ListItemsSize size={el} key={el} />
						))}
					</div>
				)}
				<div className={styles['itemIcon']}>
					<img src='/img/item/star.png' alt='' className={styles['itemIcon__icon']} />
					<img src='/img/item/lupa.png' alt='' className={styles['itemIcon__icon']} />
				</div>
				<div
					className={cn(styles['item__shadow'], {
						[styles['item__shadow_index']]: name != 'list',
					})}
				></div>
			</Link>
		)
	}
	return <>{createItem()}</>
}
