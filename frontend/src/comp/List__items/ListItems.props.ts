import { HTMLAttributes } from 'react'
import { itemData } from '../Index__item/IndexItem.props'

export interface ListItemsProps extends HTMLAttributes<HTMLDivElement> {
	items: itemData[]
	more: itemData[]
}
