export interface BrandlistBoardProps {
	lang: string
	table: {
		[key: string]: string[]
	}
	linkRef: React.RefObject<HTMLDivElement>
}
