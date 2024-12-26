import cn from 'classnames'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { IndexItem } from '../Index__item/IndexItem'
import styles from './ListItems.module.scss'
import { ListItemsProps } from './ListItems.props'

export function ListItems({ items, more, style }: ListItemsProps) {
	const moreRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		moreRef.current?.classList.add('lazy__img_more')
	}, [more])

	useEffect(() => {
		setTimeout(() => {
			moreRef.current?.classList.remove('lazy__img_more')
		}, 300)
	}, [more])

	return (
		<div className={styles['itemsList']} style={style}>
			{items.length != 0 && (
				<div className={styles['itemsList__block']}>
					{items.map(el => (
						<IndexItem item={el} name={'list'} key={el.id} />
					))}
				</div>
			)}
			{more.length != 0 && (
				<div className={cn(styles['itemsList__block'])} ref={moreRef}>
					{more.map(el => (
						<IndexItem item={el} name={'list'} key={el.id} />
					))}
				</div>
			)}
		</div>
	)
}
