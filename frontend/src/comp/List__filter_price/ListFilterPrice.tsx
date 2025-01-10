import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ListContext } from '../../context/list.context'
import { RangeSlider } from '../RangeSlider/RangeSlider'
import styles from './ListFilterPrice.module.scss'
import { ListFilterPriceProps } from './ListFilterPrice.props'

export function ListFilterPrice({ minPrice, maxPrice }: ListFilterPriceProps) {
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const { setListState } = useContext(ListContext)
	const minRef = useRef<HTMLInputElement>(null)
	const maxRef = useRef<HTMLInputElement>(null)
	const [price, setPrice] = useState([minPrice, maxPrice])
	const [percent, setPercent] = useState([0, 100])
	const [active, setAcrive] = useState(false)

	useEffect(() => {
		if (active) {
			setListState({ lazy: true, loading: true })
			searchParams.set('price', `${price[0]},${price[1]}`)
			if (price[0] == minPrice && price[1] == maxPrice) {
				searchParams.delete('price')
			}
			searchParams.delete('page')
			setSearchParams(searchParams, { preventScrollReset: true })
			setAcrive(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active])

	useEffect(() => {
		const min = Number(searchParams.get('price')?.split(',')[0] ?? minPrice)
		const max = Number(searchParams.get('price')?.split(',')[1] ?? maxPrice)
		setPrice([min, max])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [minPrice, maxPrice, location])

	useEffect(() => {
		const difference = maxPrice - minPrice
		const minPercent = ((price[0] - minPrice) * 100) / difference
		const maxPercent = ((price[1] - minPrice) * 100) / difference
		setPercent([minPercent, maxPercent])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [price])

	function setValue(e: FormEvent<HTMLInputElement>) {
		if (
			minRef.current instanceof HTMLInputElement &&
			maxRef.current instanceof HTMLInputElement &&
			minPrice != maxPrice &&
			(('data' in e.nativeEvent && Number(e.nativeEvent.data)) ||
				('data' in e.nativeEvent && Number(e.nativeEvent.data) == 0))
		) {
			const xMin = Number(minRef.current.value.replace(/\s+/g, ''))
			const xMax = Number(maxRef.current.value.replace(/\s+/g, ''))
			const min = xMin > maxPrice ? maxPrice : xMin < minPrice ? minPrice : xMin
			const max =
				xMax > maxPrice ? maxPrice : xMax < minPrice ? minPrice : xMax < xMin ? xMin : xMax
			setPrice([min, max])
			if (JSON.stringify(price) != JSON.stringify([min, max])) {
				setAcrive(true)
			}
		}
	}

	function sliderSetValue(percent: number[]) {
		const difference = maxPrice - minPrice
		const xMin = Math.round((minPrice + (percent[0] * difference) / 100) / 100) * 100
		const xMax = Math.round((maxPrice - (difference - (percent[1] * difference) / 100)) / 100) * 100
		const min =
			percent[0] == 0 ? minPrice : xMin > maxPrice ? maxPrice : xMin < minPrice ? minPrice : xMin
		const max =
			percent[1] == 100 ? maxPrice : xMax > maxPrice ? maxPrice : xMax < minPrice ? minPrice : xMax
		setPrice([min, max])
	}

	function createPriceBlock(text: string, num: number) {
		const price = num.toLocaleString('ru-RU')
		return (
			<div className={styles['filterPrice__block']}>
				<span className={styles['filterPrice__span']}>{text}</span>
				<div className={styles['filterPrice__input_wrap']}>
					<input
						type='text'
						className={styles['filterPrice__input']}
						value={price}
						onChange={setValue}
						ref={text == 'От' ? minRef : maxRef}
					/>
				</div>
			</div>
		)
	}
	return (
		<div className={styles['filterPrice']}>
			{createPriceBlock('От', price[0])}
			{createPriceBlock('До', price[1])}
			<RangeSlider
				percent={percent}
				sliderSetValue={sliderSetValue}
				setAcrive={setAcrive}
				off={minPrice == maxPrice}
			/>
		</div>
	)
}
