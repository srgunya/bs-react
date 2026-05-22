import { HTMLAttributes } from 'react'

export interface SliderProps extends HTMLAttributes<'div'> {
	slidesPerView: number
	slidesPerGroup: number
	name: string
}
