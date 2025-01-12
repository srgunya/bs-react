import { MouseEvent } from 'react'

export interface ListSortProps {
	styles: CSSModuleClasses
	sortState: string
	open: (ref: HTMLUListElement | null) => void
	close: (ref: HTMLUListElement | null) => void
	click: (e: MouseEvent, ref: HTMLUListElement | null) => void
}
