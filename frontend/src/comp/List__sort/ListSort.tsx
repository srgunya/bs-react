import cn from 'classnames'
import { MouseEvent, useContext, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ListContext } from '../../context/list.context'
import styles from './ListSort.module.scss'
import { ListSortProps } from './ListSort.props'

export function ListSort({ limit, sort }: ListSortProps) {
	const location = useLocation()
	const lengthRef = useRef<HTMLUListElement>(null)
	const sortRef = useRef<HTMLUListElement>(null)
	const firstRender = useRef(true)
	const [searchParams, setSearchParams] = useSearchParams()
	const { setListState } = useContext(ListContext)
	const [sortState, setSortState] = useState('Сортировка')
	const [limitState, setLimitState] = useState(limit)

	useLayoutEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
		} else {
			setSortState('Сортировка')
		}
	}, [location.pathname])

	useLayoutEffect(() => {
		setSortState(state => {
			return state == 'Сортировка' && sort == 'default' ? state : sort
		})
	}, [sort])

	useLayoutEffect(() => {
		setLimitState(limit)
	}, [limit])

	function click(e: MouseEvent, ref: HTMLUListElement | null) {
		if (e.target instanceof HTMLLIElement && e.target.parentNode instanceof Element) {
			if (e.target == e.target.parentNode.childNodes[0]) {
				ref?.classList.toggle(styles['sort__ul_active'])
				return
			}
			if (e.target.classList.contains(styles['sort__li_active'])) {
				return
			}
			if (e.target.dataset.limit) {
				setLimitState(Number(e.target.dataset.limit))
				if (e.target.dataset.limit == '20') {
					searchParams.delete('limit')
				} else {
					searchParams.set('limit', e.target.dataset.limit)
				}
			}
			if (e.target.dataset.sort) {
				setSortState(e.target.dataset.sort)
				if (e.target.dataset.sort == 'default') {
					searchParams.delete('sort')
				} else {
					searchParams.set('sort', e.target.dataset.sort)
				}
			}
			if (searchParams.get('page') || e.target.dataset.sort) {
				setListState({ lazy: true, loading: true })
			} else {
				setListState({ lazy: false, loading: true })
			}
			searchParams.delete('page')
			setSearchParams(searchParams, { preventScrollReset: true })
		}
	}

	function open(ref: HTMLUListElement | null) {
		ref?.classList.add(styles['sort__ul_active'])
	}
	function close(ref: HTMLUListElement | null) {
		ref?.classList.remove(styles['sort__ul_active'])
	}

	return (
		<div className={styles['sort']}>
			<ul
				className={cn(styles['sort__ul'], styles['sort__ul_length'])}
				onClick={e => {
					click(e, lengthRef.current)
				}}
				onMouseEnter={() => {
					open(lengthRef.current)
				}}
				onMouseLeave={() => {
					close(lengthRef.current)
				}}
				ref={lengthRef}
			>
				<li className={styles['sort__li']}>
					Показывать: {limitState}
					<img src='/img/slider/arrow.png' alt='' className={styles['sort__img']} />
				</li>
				<li
					className={cn(styles['sort__li'], {
						[styles['sort__li_active']]: limitState == 20,
					})}
					data-limit='20'
				>
					Показывать: 20
				</li>
				<li
					className={cn(styles['sort__li'], {
						[styles['sort__li_active']]: limitState == 40,
					})}
					data-limit='40'
				>
					Показывать: 40
				</li>
				<li
					className={cn(styles['sort__li'], {
						[styles['sort__li_active']]: limitState == 80,
					})}
					data-limit='80'
				>
					Показывать: 80
				</li>
			</ul>
			<ul
				className={cn(styles['sort__ul'], styles['sort__ul_sort'])}
				onClick={e => {
					click(e, sortRef.current)
				}}
				onMouseEnter={() => {
					open(sortRef.current)
				}}
				onMouseLeave={() => {
					close(sortRef.current)
				}}
				ref={sortRef}
			>
				<li className={styles['sort__li']}>
					{sortState == 'Сортировка' && 'Сортировка'}
					{sortState == 'default' && 'По умолчанию'}
					{sortState == 'priceASC' && 'По возрастанию цены'}
					{sortState == 'priceDESC' && 'По убыванию цены'}
					<img src='/img/slider/arrow.png' alt='' className={styles['sort__img']} />
				</li>
				<li
					className={cn(styles['sort__li'], {
						[styles['sort__li_active']]: sortState == 'default' || sortState == 'Сортировка',
					})}
					data-sort='default'
				>
					По умолчанию
				</li>
				<li
					className={cn(styles['sort__li'], {
						[styles['sort__li_active']]: sortState == 'priceASC',
					})}
					data-sort='priceASC'
				>
					По возрастанию цены
				</li>
				<li
					className={cn(styles['sort__li'], {
						[styles['sort__li_active']]: sortState == 'priceDESC',
					})}
					data-sort='priceDESC'
				>
					По убыванию цены
				</li>
			</ul>
		</div>
	)
}
