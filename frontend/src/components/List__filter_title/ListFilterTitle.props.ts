import { ReactNode } from 'react'
import { SetURLSearchParams } from 'react-router-dom'

export interface ListFilterTitleProps {
	children: ReactNode
	searchName: string
	listSearchParams: [URLSearchParams, SetURLSearchParams]
}
