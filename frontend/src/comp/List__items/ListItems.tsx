import cn from 'classnames'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import { ListItemsPrice, ListItemsSale } from '../List__items_price/ListItemsPrice'
import { ListItemsSize } from '../List__items_size/ListItemsSize'
import styles from './ListItems.module.scss'
import { ListItemsProps } from './ListItems.props'

export function ListItems({ items, more }: ListItemsProps) {
	const moreRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		moreRef.current?.classList.add(styles['itemsList__block_more'])
	}, [more])

	useEffect(() => {
		setTimeout(() => {
			moreRef.current?.classList.remove(styles['itemsList__block_more'])
		}, 100)
	}, [more])

	function createItem(arr: typeof items, name: string) {
		return (
			<>
				{arr.map(el => {
					const price = el.sale ? (
						<ListItemsSale price={el.price} sale={el.sale} />
					) : (
						<ListItemsPrice price={el.price} />
					)
					let split: number | string = el.sale
						? Math.round((el.price - (el.price * el.sale) / 100) / 4)
						: Math.round(el.price / 4)
					split = split.toLocaleString('ru-RU') + ' ₽'

					return (
						<Link to='' className={styles['item__link']} key={el.id}>
							<div className={styles['item__cont']}>
								<picture className={styles['item__pic'] + ' wrap_tr'}>
									<img
										src={PREFIX + el.img}
										alt=''
										className={cn(styles['item__img'], {
											['img_tr']: name == 'items',
											[styles['img_tr']]: name == 'more',
										})}
									/>
								</picture>
								<span className={styles['item__brand']}>{el.brand}</span>
								<span className={styles['item__type']}>{el.type}</span>
								<span className={styles['item__model']}>{el.model}</span>
								{price}
								<div className={styles['item__split']}>
									<span className={styles['item__split_span']}>по {split}&nbsp;</span>
									x4 платежами
								</div>
								<span className={styles['item__signature']}>с партнёрами BRANDSHOP</span>
							</div>
							<div
								className={cn(styles['itemSize'], {
									[styles['itemSize_center']]: el.size.length < 4,
								})}
							>
								{el.size.map(el => (
									<ListItemsSize size={el} key={el} />
								))}
							</div>
							<div className={styles['itemIcon']}>
								<img src='/img/item/star.png' alt='' className={styles['itemIcon__icon']} />
								<img src='/img/item/lupa.png' alt='' className={styles['itemIcon__icon']} />
							</div>
							<div className={styles['item__shadow']}></div>
						</Link>
					)
				})}
			</>
		)
	}
	return (
		<div className={styles['itemsList']}>
			{items.length != 0 && (
				<div className={cn(styles['itemsList__block'])}>{createItem(items, 'items')}</div>
			)}
			{more.length != 0 && (
				<div
					className={cn(styles['itemsList__block'], styles['itemsList__block_more'])}
					ref={moreRef}
				>
					{createItem(more, 'more')}
				</div>
			)}
		</div>
	)
}
