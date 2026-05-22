import { HTMLAttributes } from 'react'
import { itemData } from '../../interfaces/item.interface'

export interface ListItemsProps extends HTMLAttributes<HTMLDivElement> {
	items: itemData[]
	more: itemData[]
}
