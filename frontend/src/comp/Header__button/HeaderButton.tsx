import cn from 'classnames'
import { lazy, MouseEvent, useContext } from 'react'
import { useSelector } from 'react-redux'
import { HeaderContext } from '../../context/header.context'
import { RootState } from '../../store/store'
import styles from './HeaderButton.module.scss'

const Basket = lazy(() => import('../Basket/Basket'))

export function HeaderButton() {
	const { setBasketVisible } = useContext(HeaderContext)
	const basketState = useSelector((state: RootState) => state.basket.basket)

	function basket(e: MouseEvent) {
		if (e.target instanceof HTMLButtonElement) {
			setBasketVisible(state => !state)
			e.target.disabled = true
			setTimeout(() => {
				if (e.target instanceof HTMLButtonElement) {
					e.target.disabled = false
				}
			}, 200)
		}
	}

	const header_but = [
		{ img: '/img/header/star.png', onClick: () => false },
		{ img: '/img/header/lupa.png', onClick: () => false },
		{
			img: '/img/header/bag.png',
			onClick: (e: MouseEvent) => {
				basket(e)
			},
			class: 'button_basket',
		},
		{ img: '/img/header/user.png', onClick: () => false },
	]

	return (
		<div className={styles['headerBut']}>
			{header_but.map((el, i) => (
				<button
					className={cn(styles['headerBut__button'], el.class)}
					key={i}
					onClick={el.onClick}
				>
					<img src={el.img} className={styles['headerBut__img']} />
					{el.class == 'button_basket' && basketState.length != 0 && (
						<div className={styles['basket__count']}>
							{basketState.reduce((acc, el) => acc + el.count, 0)}
						</div>
					)}
				</button>
			))}
			<Basket />
		</div>
	)
}
