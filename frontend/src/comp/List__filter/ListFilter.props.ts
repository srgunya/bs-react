import { SetURLSearchParams } from 'react-router-dom'
import { filterData } from '../../interfaces/filter.interface'

export interface ListFilterProps {
	facets: filterData
	listSearchParams: [URLSearchParams, SetURLSearchParams]
}
