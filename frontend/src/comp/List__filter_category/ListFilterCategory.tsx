import cn from 'classnames'
import { ChangeEvent, useContext, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ListContext } from '../../context/list.context'
import { ListFilterSearch } from '../List__filter_search/ListFilterSearch'
import { ListFilterTitle } from '../List__filter_title/ListFilterTitle'
import styles from './ListFilterCategory.module.scss'
import { ListFilterCategoryProps } from './ListFilterCategory.props'

export function ListFilterCategory({ facets, name, searchName }: ListFilterCategoryProps) {
	const ulRef = useRef<HTMLUListElement>(null)
	const [error, setError] = useState('')
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const { setListState } = useContext(ListContext)

	useLayoutEffect(() => {
		if (ulRef.current?.scrollTop) {
			ulRef.current.scrollTop = 0
		}
	}, [location.pathname])

	function click(e: ChangeEvent<HTMLInputElement>) {
		const oldUrl = searchParams.get(searchName)
		let newUrl
		if (e.currentTarget.checked) {
			newUrl = oldUrl ? oldUrl + ',' + e.target.id : e.target.id
		} else {
			newUrl = oldUrl
				? oldUrl
						.split(',')
						.filter(el => el !== e.target.id)
						.join(',')
				: ''
		}
		if (!newUrl) {
			searchParams.delete(searchName)
		} else {
			searchParams.set(searchName, newUrl)
		}
		setListState({ lazy: true, loading: true })
		searchParams.delete('page')
		setSearchParams(searchParams, { preventScrollReset: true })
	}

	function createCategory() {
		return (
			<>
				<ListFilterTitle>{name}</ListFilterTitle>
				{facets.length > 7 && <ListFilterSearch ulRef={ulRef} setError={setError} />}
				<ul
					className={cn(styles['filter__ul'], {
						[styles['filter__ul_size']]: name == 'Размер',
					})}
					ref={ulRef}
				>
					{facets.map(el => {
						return (
							<li key={el} className={styles['filter__li']} data-category={el}>
								<input
									type='checkbox'
									id={el}
									className={styles['filter__checkbox']}
									onChange={click}
									checked={searchParams.get(searchName)?.split(',').includes(el) ? true : false}
								/>
								<label htmlFor={el} className={styles['filter__label']}>
									{el}
								</label>
							</li>
						)
					})}
				</ul>
			</>
		)
	}
	return (
		<>
			{createCategory()}
			{error && (
				<div className={styles['filter__error']}>
					По запросу<span className={styles['filter__error_span']}>&nbsp;«{error}»&nbsp;</span>
					ничего не найдено
				</div>
			)}
		</>
	)
}
