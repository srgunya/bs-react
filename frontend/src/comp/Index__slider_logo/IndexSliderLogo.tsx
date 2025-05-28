import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import { PREFIX } from '../../helpers/API'
import { logoData } from '../../interfaces/logo.interface'
import { Slider } from '../Slider/Slider'
import styles from './IndexSliderLogo.module.scss'
import { IndexSliderLogoProps } from './IndexSliderLogo.props'

export function IndexSliderLogo({
	logos,
	name,
	divideArr,
}: IndexSliderLogoProps) {
	const [newLogos] = useState(divideArr<logoData>(10, logos))

	function logoSlider() {
		return newLogos.map((arr, i) => (
			<SwiperSlide className={styles['indexSlider__slide']} key={i}>
				{arr.map(el => (
					<Link to='' className={styles['indexSlider__link']} key={el.id}>
						<picture className={styles['indexSlider__pic'] + ' wrap_tr'}>
							<img
								src={PREFIX + el.logo}
								alt=''
								className={styles['indexSlider__img'] + ' img_tr'}
							/>
						</picture>
					</Link>
				))}
			</SwiperSlide>
		))
	}

	return (
		<Slider
			className={styles['indexSlider_logo']}
			slidesPerView={1}
			slidesPerGroup={1}
			name={name}
		>
			{logoSlider()}
		</Slider>
	)
}
