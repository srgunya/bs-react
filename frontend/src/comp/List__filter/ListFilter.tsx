import cn from 'classnames'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { sortByAlphabet, sortSize } from '../../helpers/sort'
import { ListFilterCategory } from '../List__filter_category/ListFilterCategory'
import { ListFilterPrice } from '../List__filter_price/ListFilterPrice'
import styles from './ListFilter.module.scss'
import { ListFilterProps } from './ListFilter.props'

export function ListFilter({ facets }: ListFilterProps) {
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

	useLayoutEffect(() => {
		const price = facets.price.buckets.map(el => +el.key)
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
			if (lastScrollTop > top) {
				if (filterRef.current instanceof Element) {
					const styles = window.getComputedStyle(filterRef.current).top
					let del = parseInt(styles) + (lastScrollTop - top)
					if (del >= 110) {
						del = 110
					}
					filterRef.current.style.top = `${del}px`
				}
				// console.log('top')
			} else if (lastScrollTop < top) {
				if (filterRef.current instanceof Element) {
					const styles = window.getComputedStyle(filterRef.current)
					let del = parseInt(styles.top) + (lastScrollTop - top)
					const hieght = 1000 - (1745.5 - parseInt(styles.height))
					if (del <= -hieght) {
						del = -hieght
					}
					filterRef.current.style.top = `${del}px`
				}
				// console.log('down')
			}
			lastScrollTop = top
		}
	}, [])

	return (
		<div className={styles['filter']} ref={filterRef}>
			<div className={styles['filterHeader']}>
				<div className={styles['filterHeader__title']}>Фильтр</div>
				<div className={cn(styles['filterHeader__reset'], styles['filterHeader__reset_none'])}>
					<button className={styles['filterHeader__button']}>
						<img src='/img/filter/close.png' alt='' className={styles['filterHeader__img']} />
					</button>
					<span className={styles['filterHeader__span']}>Сбросить фильтр</span>
				</div>
			</div>
			<div className={styles['filter__title']}>Цена</div>
			<ListFilterPrice />
			<ListFilterCategory name='Пол' searchName='pol' facets={params.sex} />
			<ListFilterCategory name='Категория' searchName='kategoriya' facets={params.category} />
			<ListFilterCategory name='Цвет' searchName='tsvet' facets={params.color} />
			<ListFilterCategory name='Размер' searchName='razmer' facets={params.size} />
			<ListFilterCategory name='Бренд' searchName='brand' facets={params.brand} />
		</div>
	)
}
