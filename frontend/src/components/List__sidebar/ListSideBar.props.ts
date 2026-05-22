import { SetURLSearchParams } from 'react-router-dom'

export interface ListSideBarProps {
	limit: number
	sort: string
	listSearchParams: [URLSearchParams, SetURLSearchParams]
}
