import { itemData } from '../../interfaces/item.interface'

export interface IndexSliderItemProps {
	name: string
	items: itemData[]
	divideArr: <T>(num: number, arr: T[]) => T[][]
}
