export interface PageData {
	id: number
	tag: string
	text: (string | (string | string[])[])[]
	link?: string[]
	strong?: string[]
}
