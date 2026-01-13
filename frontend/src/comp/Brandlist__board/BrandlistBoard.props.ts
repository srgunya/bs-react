import { brandListData } from '../../interfaces/brandList.interface'

export interface BrandlistBoardProps {
	lang: string
	table: brandListData
	linkRef: React.RefObject<HTMLDivElement>
}
