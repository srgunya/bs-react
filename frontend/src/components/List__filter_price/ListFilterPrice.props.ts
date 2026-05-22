import { SetURLSearchParams } from 'react-router-dom'

export interface ListFilterPriceProps {
	minPrice: number
	maxPrice: number
	listSearchParams: [URLSearchParams, SetURLSearchParams]
}
