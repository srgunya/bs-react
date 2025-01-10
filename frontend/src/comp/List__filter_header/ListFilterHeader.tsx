import cn from 'classnames'
import { useContext, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListContext } from '../../context/list.context'
import styles from './ListFilterHeader.module.scss'

export function ListFilterHeader() {
	const [searchParams, setSearchParams] = useSearchParams()
	const titleRef = useRef<HTMLDivElement>(null)
	const resetRef = useRef<HTMLDivElement>(null)
	const { setListState } = useContext(ListContext)

	useEffect(() => {
		if (
			searchParams.get('price') ||
			searchParams.get('pol') ||
			searchParams.get('kategoriya') ||
			searchParams.get('tsvet') ||
			searchParams.get('razmer') ||
			searchParams.get('brand')
		) {
			titleRef.current?.classList.add(styles['filterHeader_hide'])
			resetRef.current?.classList.remove(styles['filterHeader_none'])
			setTimeout(() => {
				resetRef.current?.classList.remove(styles['filterHeader_hide'])
			}, 300)
		} else {
			resetRef.current?.classList.add(styles['filterHeader_hide'])
			setTimeout(() => {
				resetRef.current?.classList.add(styles['filterHeader_none'])
				titleRef.current?.classList.remove(styles['filterHeader_hide'])
			}, 300)
		}
	}, [searchParams])

	function reset() {
		setListState({ lazy: true, loading: true })
		searchParams.delete('page')
		searchParams.delete('price')
		searchParams.delete('pol')
		searchParams.delete('kategoriya')
		searchParams.delete('tsvet')
		searchParams.delete('razmer')
		searchParams.delete('brand')
		setSearchParams(searchParams, { preventScrollReset: true })
		resetRef.current?.classList.add(styles['filterHeader_hide'])
		setTimeout(() => {
			resetRef.current?.classList.add(styles['filterHeader_none'])
			titleRef.current?.classList.remove(styles['filterHeader_hide'])
		}, 300)
	}

	return (
		<div className={styles['filterHeader']}>
			<div className={styles['filterHeader__title']} ref={titleRef}>
				Фильтр
			</div>
			<div
				className={cn(
					styles['filterHeader__reset'],
					styles['filterHeader_hide'],
					styles['filterHeader_none']
				)}
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
