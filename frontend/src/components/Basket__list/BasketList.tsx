import cn from 'classnames'
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderContext } from '../../context/header.context'
import { getNoun } from '../../helpers/getNoun'
import { basketActions, getItems } from '../../store/basket.slice'
import { AppDispatch, RootState } from '../../store/store'
import { BasketItems } from '../Basket__list_items/BasketItems'
import { Button } from '../Button/Button'
import { Lable } from '../Lable/Lable'
import styles from './BasketList.module.scss'
import { BasketListProps } from './BasketList.props'

export function BasketList({ setEmpty }: BasketListProps) {
	const { basket, items } = useSelector((state: RootState) => state.basket)
	const { basketVisible } = useContext(HeaderContext)
	const [countItems, setCountItems] = useState(0)
	const [price, setPrice] = useState(0)
	const dispatch = useDispatch<AppDispatch>()
	const clearRef = useRef<HTMLImageElement>(null)

	useLayoutEffect(() => {
		const price = basket.reduce((acc, el) => {
			const item = items.find(item => item.id == el.id)
			let price = 0
			if (item) {
				if (item.sale) {
					price =
						Math.round(item.price - (item.price * item.sale) / 100) * el.count
				} else {
					price = item.price * el.count
				}
			}
			return acc + price
		}, 0)
		setPrice(price)
	}, [basket, items])

	useLayoutEffect(() => {
		const count = basket.reduce((acc, el) => acc + el.count, 0)
		setCountItems(count)
		dispatch(getItems())
	}, [basket, dispatch])

	useEffect(() => {
		setTimeout(() => {
			clearRef.current?.parentElement?.classList.remove(
				styles['basketHeader__trash_cursor']
			)
			clearRef.current?.classList.remove(styles['basketHeader__trash_hide'])
			clearRef.current?.previousElementSibling?.classList.add(
				styles['basketHeader__trash_hide']
			)
		}, 150)
	}, [basketVisible])

	function clearHide() {
		clearRef.current?.classList.add(styles['basketHeader__trash_hide'])
		setTimeout(() => {
			clearRef.current?.previousElementSibling?.classList.remove(
				styles['basketHeader__trash_hide']
			)
			clearRef.current?.parentElement?.classList.add(
				styles['basketHeader__trash_cursor']
			)
		}, 100)
	}

	function clear() {
		setEmpty(true)
		setTimeout(() => {
			dispatch(basketActions.clear())
		}, 100)
	}

	return (
		<div className={styles['basket__list']}>
			<div className={styles['basketHeader']}>
				<div className={styles['basketHeader__block']}>
					<h1 className={styles['basketHeader__h1']}>Корзина</h1>
					<p className={styles['basketHeader__p']}>
						{countItems + ' '}
						{getNoun(countItems, 'товар', 'товара', 'товаров')}
					</p>
				</div>
				<button
					className={styles['basketHeader__button_trash']}
					onClick={clearHide}
				>
					<span
						className={cn(
							styles['basketHeader__span_trash'],
							styles['basketHeader__trash_hide'],
							'button_basket'
						)}
						onClick={clear}
					>
						Удалить всё
					</span>
					<img
						src='/img/basket/trash.png'
						alt=''
						className={styles['basketHeader__img_trash']}
						ref={clearRef}
					/>
				</button>
			</div>
			<BasketItems countItems={countItems} setEmpty={setEmpty} />
			<div className={styles['basketInterface']}>
				<Button className={styles['basketInterface__order']}>
					Оформить заказ на {price.toLocaleString('ru-RU') + ' ₽'}
				</Button>
				<Button>Заказ в один клик</Button>
				<Lable
					className={styles['basketInterface__lable']}
					price={Math.round(price / 4)}
				/>
			</div>
		</div>
	)
}
