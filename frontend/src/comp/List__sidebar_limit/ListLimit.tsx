import cn from 'classnames'
import { useRef } from 'react'
import { ListLimitProps } from './ListLimit.props'
export function ListLimit({
	styles,
	limitState,
	open,
	close,
	click,
}: ListLimitProps) {
	const lengthRef = useRef<HTMLUListElement>(null)

	return (
		<ul
			className={cn(styles['sort__ul'], styles['sort__ul_length'])}
			onClick={e => {
				click(e, lengthRef.current)
			}}
			onMouseEnter={() => {
				open(lengthRef.current)
			}}
			onMouseLeave={() => {
				close(lengthRef.current)
			}}
			ref={lengthRef}
		>
			<li className={styles['sort__li']}>
				Показывать: {limitState}
				<img
					src='/img/slider/arrow.png'
					alt=''
					className={styles['sort__img']}
				/>
			</li>
			<li
				className={cn(styles['sort__li'], {
					[styles['sort__li_active']]: limitState == 20,
				})}
				data-limit='20'
			>
				Показывать: 20
			</li>
			<li
				className={cn(styles['sort__li'], {
					[styles['sort__li_active']]: limitState == 40,
				})}
				data-limit='40'
			>
				Показывать: 40
			</li>
			<li
				className={cn(styles['sort__li'], {
					[styles['sort__li_active']]: limitState == 80,
				})}
				data-limit='80'
			>
				Показывать: 80
			</li>
		</ul>
	)
}
