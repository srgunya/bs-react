import cn from 'classnames'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import styles from './Slider.module.scss'
import { SliderProps } from './Slider.props'

export function Slider({
	className,
	children,
	slidesPerView,
	slidesPerGroup,
	name,
}: SliderProps) {
	return (
		<Swiper
			spaceBetween={24}
			slidesPerView={slidesPerView}
			slidesPerGroup={slidesPerGroup}
			className={cn(className, styles['indexSlider'])}
			wrapperClass={styles['sliderWrapper']}
			pagination={{
				el: '.' + styles['sliderNav__pagi'],
				type: 'fraction',
			}}
			navigation={{
				nextEl: '.' + styles['sliderNav__next'],
				prevEl: '.' + styles['sliderNav__prev'],
				disabledClass: styles['sliderNav__button_disabled'],
			}}
			modules={[Pagination, Navigation]}
		>
			<div
				className={cn(styles['sliderNav'], {
					[styles['sliderNav_item']]: name != 'Популярные бренды',
				})}
			>
				<div className={styles['sliderNav__name']}>{name}</div>
				<div className={styles['sliderNav__pagi']}></div>
				<button
					className={cn(
						styles['sliderNav__prev'],
						styles['sliderNav__button_disabled']
					)}
				>
					<img
						src='/img/slider/arrow.png'
						alt=''
						className={styles['sliderNav__img']}
					/>
				</button>
				<button className={styles['sliderNav__next']}>
					<img
						src='/img/slider/arrow.png'
						alt=''
						className={styles['sliderNav__img']}
					/>
				</button>
			</div>
			{children}
		</Swiper>
	)
}
