import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { HeaderContext } from '../../context/header.context'
import { useLink } from '../../hooks/use-link.hook'
import { Button } from '../Button/Button'
import styles from './BasketEmpty.module.scss'

export function BasketEmpty() {
	const linkTo = useLink()
	const { setBasketVisible } = useContext(HeaderContext)

	return (
		<div className={styles['basket__empty']}>
			<h1 className={styles['basket__h1']}>Корзина</h1>
			<p className={styles['basket__p']}>
				Вы пока что еще ничего не добавили в корзину
			</p>
			<Link
				to='/new/'
				onClick={e => {
					setBasketVisible(false)
					linkTo(e, '/new/')
				}}
				className={styles['basket__link']}
			>
				<Button className={styles['basket__button_new']}>
					Перейти к новинкам
				</Button>
			</Link>
		</div>
	)
}
