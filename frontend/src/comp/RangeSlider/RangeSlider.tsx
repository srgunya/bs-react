import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { useState } from 'react'
export function RangeSlider() {
	const [value, setValue] = useState<number[]>([0, 100])

	const handleChange = (event: Event, newValue: number | number[]) => {
		if (event.type == 'keydown') {
			return false
		}
		setValue(newValue as number[])
	}

	return (
		<Box
			sx={{
				width: 200,
				paddingLeft: '7px',
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
			<Slider value={value} onChange={handleChange} valueLabelDisplay='off' color='primary' />
		</Box>
	)
}
