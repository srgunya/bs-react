export interface ListPaginationProps {
	countPagination: number
	params: { page: number; limit: number }
	loadMoreItems: () => void
}
