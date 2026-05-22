import cn from 'classnames'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import { basketActions, item } from '../../store/basket.slice'
import { AppDispatch, RootState } from '../../store/store'
import styles from './BasketItems.module.scss'
import { BasketItemsProps } from './BasketItems.props'

export function BasketItems({ countItems, setEmpty }: BasketItemsProps) {
	const { basket, items } = useSelector((state: RootState) => state.basket)
	const dispatch = useDispatch<AppDispatch>()
	const basketItemsRef = useRef<HTMLDivElement>(null)
	let timer = 0

	function scroll() {
		basketItemsRef.current?.classList.add(styles['basketItems_scroll'])
		clearTimeout(timer)
		timer = setTimeout(() => {
			basketItemsRef.current?.classList.remove(styles['basketItems_scroll'])
		}, 300)
	}

	function add(id: number, size: string) {
		dispatch(basketActions.add({ id, size }))
	}

	function remove(id: number, size: string) {
		if (countItems == 1) {
			setEmpty(true)
			setTimeout(() => {
				dispatch(basketActions.remove({ id, size }))
			}, 100)
		} else {
			dispatch(basketActions.remove({ id, size }))
		}
	}

	function createItem(el: item) {
		const item = items.find(item => item.id == el.id)
		let price
		if (item) {
			price =
				item?.sale == 0 ? (
					<div className={styles['itemInfo__price']}>
						{(item?.price * el.count).toLocaleString('ru-RU') + ' ₽'}
					</div>
				) : (
					<div className={styles['itemPrice']}>
						<span className={styles['itemPrice__sale']}>
							{(
								Math.round(item.price - (item.price * item.sale) / 100) *
								el.count
							).toLocaleString('ru-RU') + ' ₽'}
						</span>
						<span className={styles['itemPrice__price']}>
							{(item?.price * el.count).toLocaleString('ru-RU') + ' ₽'}
						</span>
					</div>
				)
		}

		return (
			<div className={styles['item']} key={el.id + el.size}>
				<div className={styles['itemInfo']}>
					<Link to='' className={styles['itemInfo__link']}>
						<img src={PREFIX + item?.img} className={styles['itemInfo__img']} />
					</Link>
					<div className={styles['itemInfo__text']}>
						<div className={styles['itemInfo__brand']}>{item?.brand}</div>
						<div className={styles['itemInfo__model']}>
							{item?.type + ' '}
							{item?.model}
						</div>
					</div>
					{price}
				</div>
				<div className={styles['itemInterface']}>
					<button
						className={cn(styles['itemInterface__button'], 'button_basket')}
						onClick={() => {
							remove(el.id, el.size)
						}}
					>
						<img
							src='/img/basket/minus.png'
							className={styles['itemInterface__img_minus']}
						/>
					</button>
					<span className={styles['itemInterface__count']}>{el.count}</span>
					<button
						className={cn(styles['itemInterface__button'], 'button_basket')}
						onClick={() => {
							add(el.id, el.size)
						}}
					>
						<img
							src='/img/basket/plus.png'
							className={styles['itemInterface__img_plus']}
						/>
					</button>
					<span className={styles['itemInterface__size']}>{el.size}</span>
				</div>
			</div>
		)
	}

	return (
		<div
			className={styles['basketItems']}
			ref={basketItemsRef}
			onScroll={scroll}
		>
			{basket.map(el => createItem(el))}
		</div>
	)
}
