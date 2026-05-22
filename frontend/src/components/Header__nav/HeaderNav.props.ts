import { MouseEvent } from 'react'

export interface HeaderNavProps {
	link: (e: MouseEvent, to: string) => void
}
