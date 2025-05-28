import cn from 'classnames'
import { useRef } from 'react'
import { ListSortProps } from './ListSort.props'

export function ListSort({
	styles,
	sortState,
	open,
	close,
	click,
}: ListSortProps) {
	const sortRef = useRef<HTMLUListElement>(null)
	return (
		<ul
			className={cn(styles['sort__ul'], styles['sort__ul_sort'])}
			onClick={e => {
				click(e, sortRef.current)
			}}
			onMouseEnter={() => {
				open(sortRef.current)
			}}
			onMouseLeave={() => {
				close(sortRef.current)
			}}
			ref={sortRef}
		>
			<li className={styles['sort__li']}>
				{sortState == 'Сортировка' && 'Сортировка'}
				{sortState == 'default' && 'По умолчанию'}
				{sortState == 'priceASC' && 'По возрастанию цены'}
				{sortState == 'priceDESC' && 'По убыванию цены'}
				<img
					src='/img/slider/arrow.png'
					alt=''
					className={styles['sort__img']}
				/>
			</li>
			<li
				className={cn(styles['sort__li'], {
					[styles['sort__li_active']]:
						sortState == 'default' || sortState == 'Сортировка',
				})}
				data-sort='default'
			>
				По умолчанию
			</li>
			<li
				className={cn(styles['sort__li'], {
					[styles['sort__li_active']]: sortState == 'priceASC',
				})}
				data-sort='priceASC'
			>
				По возрастанию цены
			</li>
			<li
				className={cn(styles['sort__li'], {
					[styles['sort__li_active']]: sortState == 'priceDESC',
				})}
				data-sort='priceDESC'
			>
				По убыванию цены
			</li>
		</ul>
	)
}
