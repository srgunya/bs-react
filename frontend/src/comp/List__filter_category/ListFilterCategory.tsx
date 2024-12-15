import cn from 'classnames'
import { ChangeEvent, useRef, useState } from 'react'
import { ListFilterSearch } from '../List__filter_search/ListFilterSearch'
import { ListFilterTitle } from '../List__filter_title/ListFilterTitle'
import styles from './ListFilterCategory.module.scss'
import { ListFilterCategoryProps } from './ListFilterCategory.props'

export function ListFilterCategory({
	category,
	name,
	paramName,
	categoryParams,
	startFilter,
}: ListFilterCategoryProps) {
	const ulRef = useRef<HTMLUListElement>(null)
	const [error, setError] = useState('')

	function click(e: ChangeEvent<HTMLInputElement>) {
		const url = new URL(window.location.href)
		const oldParams = url.searchParams.get(paramName)
		let newParams
		if (e.currentTarget.checked) {
			newParams = oldParams ? oldParams + ',' + e.target.id : e.target.id
			url.searchParams.set(paramName, newParams)
		} else {
			newParams = oldParams
				? oldParams
						.split(',')
						.filter(el => el !== e.target.id)
						.join(',')
				: ''
			url.searchParams.set(paramName, newParams)
			if (url.searchParams.get(paramName) == '') {
				url.searchParams.delete(paramName)
			}
		}
		url.searchParams.delete('page')
		newParams = newParams.split(',').filter(el => el != '')
		history.pushState(null, '', url.toString())
		startFilter(paramName, newParams)
	}

	function createCategory() {
		return (
			<>
				<ListFilterTitle name={name} />
				{category.length > 7 && <ListFilterSearch ulRef={ulRef} setError={setError} />}
				<ul
					className={cn(styles['filter__ul'], {
						[styles['filter__ul_size']]: name == 'Размер',
					})}
					ref={ulRef}
				>
					{category.map(el => {
						return (
							<li key={el} className={styles['filter__li']} data-category={el}>
								<input
									type='checkbox'
									id={el}
									className={styles['filter__checkbox']}
									onChange={click}
									checked={categoryParams.includes(el) ? true : false}
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
