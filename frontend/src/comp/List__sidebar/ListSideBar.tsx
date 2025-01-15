import { MouseEvent, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { listActions } from '../../store/list.slice'
import { AppDispatch } from '../../store/store'
import { ListLimit } from '../List__sidebar_limit/ListLimit'
import { ListSort } from '../List__sidebar_sort/ListSort'
import styles from './ListSideBar.module.scss'
import { ListSideBarProps } from './ListSideBar.props'

export function ListSideBar({ limit, sort, listSearchParams }: ListSideBarProps) {
	const location = useLocation()
	const [searchParams, setSearchParams] = listSearchParams
	const firstRender = useRef(true)
	const [sortState, setSortState] = useState('Сортировка')
	const [limitState, setLimitState] = useState(limit)
	const dispatch = useDispatch<AppDispatch>()

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
				dispatch(listActions.change({ lazy: true, loading: true }))
			} else {
				dispatch(listActions.change({ lazy: false, loading: true }))
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
			<ListLimit styles={styles} limitState={limitState} open={open} close={close} click={click} />
			<ListSort styles={styles} sortState={sortState} open={open} close={close} click={click} />
		</div>
	)
}
