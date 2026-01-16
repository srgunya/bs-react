import { Link } from 'react-router-dom'
import { divideArr } from '../../helpers/divideArr'
import { Button } from '../Button/Button'
import { IndexSliderItem } from '../Index__slider_item/IndexSliderItem'
import styles from './NotFound.module.scss'
import { NotFoundProps } from './NotFound.props'

export function NotFound({ sliderNotFound }: NotFoundProps) {
	return (
		<>
			<div className={styles['notFound']}>
				<h1 className={styles['notFound__num']}>404</h1>
				<p className={styles['notFound__p']}>
					Похоже, здесь что-то было, но теперь тут ничего нет
				</p>
				<Link to='/new/'>
					<Button className={styles['notFound__button']}>
						Перейти к новинкам
					</Button>
				</Link>
			</div>
			<IndexSliderItem
				name='Новые поступления'
				items={sliderNotFound}
				divideArr={divideArr}
			/>
		</>
	)
}
