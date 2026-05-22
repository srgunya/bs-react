export interface HeaderMenuBlockProps {
	params: {
		ul1: {
			to: string
			text: string
		}[]
		ul2: {
			to: string
			text: string
		}[]
		ul3?: {
			to: string
			text: string
		}[]
		ul4?: {
			to: string
			text: string
		}[]
		img: {
			to: string
			text: string
			img: string
		}[]
	}
	name: string
}
