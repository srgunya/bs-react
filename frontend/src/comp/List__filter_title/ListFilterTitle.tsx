import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { listActions } from '../../store/list.slice'
import { AppDispatch } from '../../store/store'
import styles from './ListFilterTitle.module.scss'
import { ListFilterTitleProps } from './ListFilterTitle.props'

export function ListFilterTitle({ children, searchName, checked }: ListFilterTitleProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const dispatch = useDispatch<AppDispatch>()

	function reset() {
		dispatch(listActions.change({ lazy: true, loading: true }))
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
