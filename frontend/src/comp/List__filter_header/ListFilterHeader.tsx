import cn from 'classnames'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { listActions } from '../../store/list.slice'
import { AppDispatch } from '../../store/store'
import styles from './ListFilterHeader.module.scss'
import { ListFilterHeaderProps } from './ListFilterHeader.props'

export function ListFilterHeader({ listSearchParams }: ListFilterHeaderProps) {
	const [searchParams, setSearchParams] = listSearchParams
	const titleRef = useRef<HTMLDivElement>(null)
	const resetRef = useRef<HTMLDivElement>(null)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		if (
			searchParams.has('price') ||
			searchParams.has('pol') ||
			searchParams.has('kategoriya') ||
			searchParams.has('tsvet') ||
			searchParams.has('razmer') ||
			searchParams.has('brand')
		) {
			titleRef.current?.classList.add(styles['filterHeader_hide'])
			setTimeout(() => {
				if (titleRef.current?.classList.contains(styles['filterHeader_hide'])) {
					resetRef.current?.classList.remove(styles['filterHeader_hide'])
				}
			}, 100)
		} else {
			resetRef.current?.classList.add(styles['filterHeader_hide'])
			setTimeout(() => {
				if (resetRef.current?.classList.contains(styles['filterHeader_hide'])) {
					titleRef.current?.classList.remove(styles['filterHeader_hide'])
				}
			}, 100)
		}
	}, [listSearchParams, searchParams])

	function reset() {
		dispatch(listActions.change({ lazy: true, loading: true }))
		searchParams.delete('page')
		searchParams.delete('price')
		searchParams.delete('pol')
		searchParams.delete('kategoriya')
		searchParams.delete('tsvet')
		searchParams.delete('razmer')
		searchParams.delete('brand')
		setSearchParams(searchParams, { preventScrollReset: true })
	}

	return (
		<div className={styles['filterHeader']}>
			<div className={styles['filterHeader__title']} ref={titleRef}>
				Фильтр
			</div>
			<div
				className={cn(styles['filterHeader__reset'], styles['filterHeader_hide'])}
				ref={resetRef}
				onClick={reset}
			>
				<button className={styles['filterHeader__button']}>
					<img src='/img/filter/close.png' alt='' className={styles['filterHeader__img']} />
				</button>
				<span className={styles['filterHeader__span']}>Сбросить фильтр</span>
			</div>
		</div>
	)
}
