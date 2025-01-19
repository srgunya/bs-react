import cn from 'classnames'
import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { HeaderContext } from '../../context/header.context'
import { useClickOutside } from '../../hooks/use-clickOutside.hook'
import { RootState } from '../../store/store'
import { BasketEmpty } from '../Basket__empty/BasketEmpty'
import { BasketList } from '../Basket__list/BasketList'
import styles from './Basket.module.scss'

export default function Basket() {
	const { basketVisible, setBasketVisible } = useContext(HeaderContext)
	const basketRef = useRef<HTMLDivElement>(null)
	const basketState = useSelector((state: RootState) => state.basket.basket)
	const [empty, setEmpty] = useState(true)

	useClickOutside(basketRef, 'button_basket', () => {
		setBasketVisible(false)
	})

	useEffect(() => {
		if (basketVisible) {
			basketRef.current?.classList.remove(styles['basket_none'])
			setTimeout(() => {
				basketRef.current?.classList.add(styles['basket_open'])
			}, 1)
		} else {
			basketRef.current?.classList.remove(styles['basket_open'])
			setTimeout(() => {
				basketRef.current?.classList.add(styles['basket_none'])
			}, 150)
		}
	}, [basketVisible, basketState.length])

	useEffect(() => {
		if (basketState.length != 0) {
			setEmpty(false)
		}
	}, [basketState.length])

	function hover() {
		if (basketRef.current?.parentNode?.children[2].children[1] instanceof Element) {
			basketRef.current?.parentNode?.children[2].children[1].classList.add(
				styles['basket__count_hover']
			)
		}
	}
	function blur() {
		if (basketRef.current?.parentNode?.children[2].children[1] instanceof Element) {
			basketRef.current?.parentNode?.children[2].children[1].classList.remove(
				styles['basket__count_hover']
			)
		}
	}

	return (
		<div
			className={cn(styles['basket'], styles['basket_none'], {
				[styles['basket_list']]: basketState.length != 0,
			})}
			ref={basketRef}
			onMouseOver={hover}
			onMouseLeave={blur}
		>
			{(basketState.length == 0 && <BasketEmpty />) || (empty && <BasketEmpty />)}
			{basketState.length != 0 && !empty && <BasketList setEmpty={setEmpty} />}
		</div>
	)
}
