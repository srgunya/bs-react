import { MouseEvent } from 'react'

export interface ListLimitProps {
	styles: CSSModuleClasses
	limitState: number
	open: (ref: HTMLUListElement | null) => void
	close: (ref: HTMLUListElement | null) => void
	click: (e: MouseEvent, ref: HTMLUListElement | null) => void
}
