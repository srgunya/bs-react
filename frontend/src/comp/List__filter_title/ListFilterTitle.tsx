import cn from 'classnames'
import { useState } from 'react'
import styles from './ListFilterTitle.module.scss'
import { ListFilterTitleProps } from './ListFilterTitle.props'

export function ListFilterTitle({ children }: ListFilterTitleProps) {
	const [checked] = useState(false)
	return (
		<div className={styles['filter__block']}>
			<div className={styles['filter__title']}>{children}</div>
			<span
				className={cn(styles['filter__reset'], {
					[styles['filter__reset_none']]: checked == false,
				})}
			>
				Сбросить
			</span>
		</div>
	)
}
