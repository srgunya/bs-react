import { itemData } from '../Index__item/IndexItem.props'

export interface IndexSliderItemProps {
	name: string
	items: itemData[]
	divideArr: <T>(num: number, arr: T[]) => T[][]
}
