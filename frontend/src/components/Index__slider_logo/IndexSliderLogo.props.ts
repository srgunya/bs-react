import { logoData } from '../../interfaces/logo.interface'

export interface IndexSliderLogoProps {
	name: string
	logos: logoData[]
	divideArr: <T>(num: number, arr: T[]) => T[][]
}
