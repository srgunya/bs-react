import cn from 'classnames'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { sortByAlphabet, sortSize } from '../../helpers/sort'
import { ListFilterCategory } from '../List__filter_category/ListFilterCategory'
import { ListFilterHeader } from '../List__filter_header/ListFilterHeader'
import { ListFilterPrice } from '../List__filter_price/ListFilterPrice'
import styles from './ListFilter.module.scss'
import { ListFilterProps } from './ListFilter.props'

export function ListFilter({ facets, listSearchParams }: ListFilterProps) {
	const filterRef = useRef<HTMLDivElement>(null)
	const [params, setParams] = useState({
		minPrice: 0,
		maxPrice: 0,
		sex: [''],
		category: [''],
		color: [''],
		size: [''],
		brand: [''],
	})

	useEffect(() => {
		if (params.minPrice != 0 && params.maxPrice != 0) {
			setTimeout(() => {
				filterRef.current?.classList.remove(styles['filter_hide'])
			}, 300)
		}
	}, [params])

	useLayoutEffect(() => {
		const price = facets.discount_price.buckets.map(el => +el.key)
		const minPrice = Math.min(...price)
		const maxPrice = Math.max(...price)
		const sex = sortByAlphabet(facets.sex.buckets.map(el => el.key))
		const category = sortByAlphabet(facets.category.buckets.map(el => el.key))
		const color = sortByAlphabet(facets.color.buckets.map(el => el.key))
		const size = sortSize(
			Array.from(new Set(facets.size.buckets.map(el => el.key.split(',')).flat()))
		)
		const brand = sortByAlphabet(facets.brand.buckets.map(el => el.key))
		setParams({ minPrice, maxPrice, sex, category, color, size, brand })
	}, [facets])

	useEffect(() => {
		let lastScrollTop = 0
		window.onscroll = sticky
		function sticky() {
			const top = window.pageYOffset
			if (filterRef.current instanceof Element) {
				const styles = window.getComputedStyle(filterRef.current)
				let del = parseInt(styles.top) + (lastScrollTop - top)
				if (lastScrollTop > top) {
					if (del >= 110) {
						del = 110
					}
				} else if (lastScrollTop < top) {
					const hieght = 1000 - (1745.5 - parseInt(styles.height))
					if (del <= -hieght) {
						del = -hieght
					}
				}
				filterRef.current.style.top = `${del}px`
			}

			lastScrollTop = top
		}
	}, [])

	const category = [
		{
			name: 'Пол',
			searchName: 'pol',
			facets: params.sex,
		},
		{
			name: 'Категория',
			searchName: 'kategoriya',
			facets: params.category,
		},
		{
			name: 'Цвет',
			searchName: 'tsvet',
			facets: params.color,
		},
		{
			name: 'Размер',
			searchName: 'razmer',
			facets: params.size,
		},
		{
			name: 'Бренд',
			searchName: 'brand',
			facets: params.brand,
		},
	]

	return (
		<div className={cn(styles['filter'], styles['filter_hide'])} ref={filterRef}>
			<ListFilterHeader listSearchParams={listSearchParams} />
			<div className={styles['filter__title']}>Цена</div>
			<ListFilterPrice
				minPrice={params.minPrice}
				maxPrice={params.maxPrice}
				listSearchParams={listSearchParams}
			/>
			{category.map(el => (
				<ListFilterCategory
					name={el.name}
					searchName={el.searchName}
					facets={el.facets}
					listSearchParams={listSearchParams}
					key={el.name}
				/>
			))}
		</div>
	)
}
