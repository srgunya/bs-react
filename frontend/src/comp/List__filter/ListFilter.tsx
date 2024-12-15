import cn from 'classnames'
import { useLayoutEffect, useState } from 'react'
import { sortByAlphabet, sortSize } from '../../helpers/sort'
import { ListFilterCategory } from '../List__filter_category/ListFilterCategory'
import { ListFilterPrice } from '../List__filter_price/ListFilterPrice'
import styles from './ListFilter.module.scss'
import { ListFilterProps } from './ListFilter.props'

export function ListFilter({ facets, filterParams, startFilter }: ListFilterProps) {
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

	return (
		<div className={styles['filter']}>
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
			<ListFilterCategory
				category={params.sex}
				name='Пол'
				paramName='pol'
				categoryParams={filterParams.pol}
				startFilter={startFilter}
			/>
			<ListFilterCategory
				category={params.category}
				name='Категория'
				paramName='kategoriya'
				categoryParams={filterParams.kategoriya}
				startFilter={startFilter}
			/>
			<ListFilterCategory
				category={params.color}
				name='Цвет'
				paramName='tsvet'
				categoryParams={filterParams.tsvet}
				startFilter={startFilter}
			/>
			<ListFilterCategory
				category={params.size}
				name='Размер'
				paramName='razmer'
				categoryParams={filterParams.razmer}
				startFilter={startFilter}
			/>
			<ListFilterCategory
				category={params.brand}
				name='Бренд'
				paramName='brand'
				categoryParams={filterParams.brand}
				startFilter={startFilter}
			/>
		</div>
	)
}
