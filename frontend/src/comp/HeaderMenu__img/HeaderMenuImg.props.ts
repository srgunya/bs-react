import { MouseEvent } from 'react'

export interface HeaderMenuImgProps {
	name: string
	img: {
		to: string
		text: string
		img: string
	}[]
	link: (e: MouseEvent, to: string) => false | undefined
}
