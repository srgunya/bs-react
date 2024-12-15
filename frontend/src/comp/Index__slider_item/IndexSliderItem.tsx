import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import { PREFIX } from '../../helpers/API'
import { ListItemsPrice, ListItemsSale } from '../List__items_price/ListItemsPrice'
import { Slider } from '../Slider/Slider'
import styles from './IndexSliderItem.module.scss'
import { IndexSliderItemProps } from './IndexSliderItem.props'

export function IndexSliderItem({ items, name }: IndexSliderItemProps) {
	function itemSlider() {
		return items.map(el => (
			<SwiperSlide key={el.id} className={styles['indexSlider__slide']}>
				<Link to='' className={styles['indexSlider__link']}>
					<picture className={styles['indexSlider__pic'] + ' wrap_tr'}>
						<img src={PREFIX + el.img} alt='' className={styles['indexSlider__img'] + ' img_tr'} />
					</picture>
					<span className={styles['indexSlider__brand']}>{el.brand}</span>
					<span className={styles['indexSlider__type']}>{el.type}</span>
					<span className={styles['indexSlider__model']}>{el.model}</span>
					{el.sale ? (
						<ListItemsSale price={el.price} sale={el.sale} />
					) : (
						<ListItemsPrice price={el.price} />
					)}
					<div className={styles['itemIcon']}>
						<img src='/img/item/star.png' alt='' className={styles['itemIcon__icon']} />
						<img src='/img/item/lupa.png' alt='' className={styles['itemIcon__icon']} />
					</div>
					<div className={styles['itemIcon__shadow']}></div>
				</Link>
			</SwiperSlide>
		))
	}

	return (
		<Slider className={styles['indexSlider_item']} slidesPerView={5} slidesPerGroup={5} name={name}>
			{itemSlider()}
		</Slider>
	)
}
