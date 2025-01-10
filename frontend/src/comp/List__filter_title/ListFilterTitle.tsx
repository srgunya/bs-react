import cn from 'classnames'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ListContext } from '../../context/list.context'
import styles from './ListFilterTitle.module.scss'
import { ListFilterTitleProps } from './ListFilterTitle.props'

export function ListFilterTitle({ children, searchName, checked }: ListFilterTitleProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const { setListState } = useContext(ListContext)

	function reset() {
		setListState({ lazy: true, loading: true })
		searchParams.delete(searchName)
		searchParams.delete('page')
		setSearchParams(searchParams, { preventScrollReset: true })
	}

	return (
		<div className={styles['filter__block']}>
			<div className={styles['filter__title']}>{children}</div>
			<span
				className={cn(styles['filter__reset'], {
					[styles['filter__reset_none']]: checked == false,
				})}
				onClick={reset}
			>
				Сбросить
			</span>
		</div>
	)
}
