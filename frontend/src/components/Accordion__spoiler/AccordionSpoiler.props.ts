import { PageData } from '../../interfaces/page.interface'

export interface AccordionSpoilerProps {
	spoiler: PageData[]
	checkInsideTag: (
		fragment: string | (string | string[])[],
		link: string[] | undefined,
		strong: string[] | undefined,
	) => string | (string | string[])[] | JSX.Element
}
