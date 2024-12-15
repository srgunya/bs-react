import { FormEvent, useRef, useState } from 'react'
import styles from './ListFilterSearch.module.scss'
import { ListFilterSearchProps } from './ListFilterSearch.props'

export function ListFilterSearch({ ulRef, setError }: ListFilterSearchProps) {
	const searchRef = useRef<HTMLDivElement>(null)
	const [searchValue, setSearchValue] = useState('')

	function focus() {
		searchRef.current?.classList.toggle(styles['filter__search_focus'])
	}

	function clear() {
		setSearchValue('')
		setError('')
		ulRef.current?.childNodes.forEach(el => {
			if (el instanceof HTMLLIElement) {
				el.classList.remove(styles['filter__li_none'])
			}
		})
		searchRef.current?.classList.remove(styles['filter__search_change'])
	}

	function search(e: FormEvent<HTMLInputElement>) {
		setSearchValue(e.currentTarget.value)
		if (e.currentTarget.value != '') {
			searchRef.current?.classList.add(styles['filter__search_change'])
		} else {
			searchRef.current?.classList.remove(styles['filter__search_change'])
		}
		let current = 0
		ulRef.current?.childNodes.forEach(el => {
			if (el instanceof HTMLLIElement && el.dataset.category) {
				const order = el.dataset.category.toLowerCase()
				if (!order.includes(e.currentTarget.value.toLowerCase())) {
					current++
					el.classList.add(styles['filter__li_none'])
				} else {
					el.classList.remove(styles['filter__li_none'])
				}
			}
		})
		if (current == ulRef.current?.childNodes.length) {
			setError(e.currentTarget.value)
		} else {
			setError('')
		}
	}

	return (
		<div className={styles['filter__search_wrap']} ref={searchRef}>
			<input
				type='text'
				placeholder='Поиск'
				className={styles['filter__search']}
				value={searchValue}
				onFocus={focus}
				onBlur={focus}
				onChange={search}
			/>
			<img
				src='/img/filter/x.png'
				alt=''
				className={styles['filter__search_clear']}
				onClick={clear}
			/>
		</div>
	)
}
