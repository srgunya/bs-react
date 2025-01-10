export interface RangeSliderProps {
	percent: number[]
	sliderSetValue: (percent: number[]) => void
	off: boolean
	setAcrive: React.Dispatch<React.SetStateAction<boolean>>
}
