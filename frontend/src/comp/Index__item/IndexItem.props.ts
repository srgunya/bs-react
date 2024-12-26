export interface itemData {
	brand: string
	category: string
	class: string
	color: string
	id: number
	img: string
	info: string
	model: string
	photo: string
	price: number
	sale: number
	sex: string
	size: string[]
	type: string
}

export interface IndexItemProps {
	item: itemData
	name?: string
}
