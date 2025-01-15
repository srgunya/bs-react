import { SetURLSearchParams } from 'react-router-dom'

export interface ListFilterCategoryProps {
	name: string
	searchName: string
	facets: string[]
	listSearchParams: [URLSearchParams, SetURLSearchParams]
}
