import { useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { IndexItem } from '../Index__item/IndexItem'
import { itemData } from '../Index__item/IndexItem.props'
import { Slider } from '../Slider/Slider'
import styles from './IndexSliderItem.module.scss'
import { IndexSliderItemProps } from './IndexSliderItem.props'

export function IndexSliderItem({ items, name, divideArr }: IndexSliderItemProps) {
	const [newItems] = useState(divideArr<itemData>(5, items))

	function itemSlider() {
		return newItems.map((arr, i) => (
			<SwiperSlide className={styles['indexSlider__slide']} key={i}>
				{arr.map(el => (
					<IndexItem item={el} key={el.id} />
				))}
			</SwiperSlide>
		))
	}

	return (
		<Slider className={styles['indexSlider_item']} slidesPerView={1} slidesPerGroup={1} name={name}>
			{itemSlider()}
		</Slider>
	)
}
