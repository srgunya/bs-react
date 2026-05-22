import { SetURLSearchParams } from 'react-router-dom'

export interface ListPaginationProps {
	countPagination: number
	params: { page: number; limit: number }
	loadMoreItems: () => void
	listSearchParams: [URLSearchParams, SetURLSearchParams]
}
