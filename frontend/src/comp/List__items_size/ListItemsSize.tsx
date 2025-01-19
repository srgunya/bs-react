import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { basketActions } from '../../store/basket.slice'
import { AppDispatch } from '../../store/store'
import styles from './ListItemsSize.module.scss'
import { ListItemsSizeProps } from './ListItemsSize.props'

export function ListItemsSize({ size, itemID }: ListItemsSizeProps) {
	const dispatch = useDispatch<AppDispatch>()

	function clickSize(e: MouseEvent) {
		e.preventDefault()
		if (e.target instanceof HTMLButtonElement) {
			setTimeout(() => {
				dispatch(basketActions.add({ id: itemID, size }))
			}, 150)
			e.target.classList.add(styles['itemSize__size_click'])
			e.target.disabled = true
			setTimeout(() => {
				if (e.target instanceof Element && e.target.classList) {
					e.target.classList.remove(styles['itemSize__size_click'])
				}
			}, 1000)
			setTimeout(() => {
				if (e.target instanceof HTMLButtonElement) {
					e.target.disabled = false
				}
			}, 1500)
		}
	}

	return (
		<div className={styles['itemSize__wrap']}>
			<button className={styles['itemSize__size']} onClick={clickSize}>
				{size} <img src='/img/item/ok.png' alt='' className={styles['itemSize__ok']} />
			</button>
		</div>
	)
}
