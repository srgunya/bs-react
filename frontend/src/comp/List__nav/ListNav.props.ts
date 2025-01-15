import { SetURLSearchParams } from 'react-router-dom'

export interface ListNavProps {
	params: string[]
	brand: string
	listSearchParams: [URLSearchParams, SetURLSearchParams]
}
