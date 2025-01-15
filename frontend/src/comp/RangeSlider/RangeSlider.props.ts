export interface RangeSliderProps {
	percent: number[]
	sliderSetValue: (percent: number[]) => void
	setAcrive: React.Dispatch<React.SetStateAction<boolean>>
}
