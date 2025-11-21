interface h1 {
	h1: string
	to?: never
	text?: never
	img?: never
}
interface link {
	h1?: never
	to: string
	text: string
	img?: string
	target?: string
}

export type FooterProps = Array<h1 | link>
