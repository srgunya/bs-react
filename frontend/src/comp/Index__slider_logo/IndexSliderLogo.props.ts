export interface logoData {
	id: number
	brand: string
	logo: string
}
export interface IndexSliderLogoProps {
	name: string
	logos: logoData[]
	divideArr: <T>(num: number, arr: T[]) => T[][]
}
