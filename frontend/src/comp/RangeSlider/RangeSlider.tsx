import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { RangeSliderProps } from './RangeSlider.props'

export function RangeSlider({ percent, sliderSetValue, setAcrive, off }: RangeSliderProps) {
	const [value, setValue] = useState<number[]>([0, 100])

	const handleChange = (event: Event, newValue: number | number[]) => {
		if (event.type == 'keydown' || off) {
			return false
		}
		sliderSetValue(newValue as number[])
	}

	useEffect(() => {
		const x = percent[0] ? percent[0] : 0
		const y = percent[1] ? percent[1] : percent[1] == 0 ? 0 : 100
		setValue([x, y])
	}, [percent])

	return (
		<Box
			sx={{
				width: 200,
				paddingLeft: '8px',
				color: 'success.main',
				'& .MuiSlider-thumb': {
					width: '22px',
					height: '21px',
					borderRadius: '8px',
					border: '4px solid #f2f2f2',
					boxShadow: 'none!important',
				},
				'& .MuiSlider-rail': {
					height: '3px',
					backgroundColor: 'rgba(0, 0, 0, 0.4)',
				},
				'& .MuiSlider-track': {
					height: '3px',
				},
			}}
		>
			<Slider
				value={value}
				onChange={handleChange}
				onChangeCommitted={_.debounce(() => {
					if (!off) {
						setAcrive(true)
					}
				}, 200)}
				valueLabelDisplay='off'
				color='primary'
			/>
		</Box>
	)
}
