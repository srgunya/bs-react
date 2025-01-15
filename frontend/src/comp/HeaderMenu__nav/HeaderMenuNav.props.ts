import { MouseEvent } from 'react'

export interface HeaderMenuNavProps {
	name: string
	ul: {
		to: string
		text: string
	}[]
	link: (e: MouseEvent, to: string) => false | undefined
}
