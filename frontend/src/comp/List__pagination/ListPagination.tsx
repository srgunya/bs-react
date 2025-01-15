import cn from 'classnames'
import { MouseEvent, useLayoutEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { listActions } from '../../store/list.slice'
import { AppDispatch } from '../../store/store'
import styles from './ListPagination.module.scss'
import { ListPaginationProps } from './ListPagination.props'

export function ListPagination({
	countPagination,
	params,
	loadMoreItems,
	listSearchParams,
}: ListPaginationProps) {
	const moreRef = useRef<HTMLButtonElement>(null)
	const activeRef = useRef<HTMLButtonElement>(null)
	const { page, limit } = params
	const [searchParams, setSearchParams] = listSearchParams
	const dispatch = useDispatch<AppDispatch>()

	useLayoutEffect(() => {
		moreRef.current?.classList.remove(styles['ListPagination__more_load'])
	}, [page])

	function next() {
		if (activeRef.current?.nextElementSibling instanceof HTMLButtonElement) {
			activeRef.current?.nextElementSibling.click()
		}
	}
	function prev() {
		if (activeRef.current?.previousElementSibling instanceof HTMLButtonElement) {
			activeRef.current?.previousElementSibling.click()
		}
	}

	function more(e: MouseEvent) {
		if (e.target instanceof Element) {
			moreRef.current?.classList.add(styles['ListPagination__more_load'])
			searchParams.set('page', `${page + 1}`)
			loadMoreItems()
			setSearchParams(searchParams, { preventScrollReset: true })
			dispatch(listActions.change({ lazy: false, loading: true }))
			// setListState(state => ({ ...state, loading: true }))
		}
	}
	function link(e: MouseEvent) {
		window.scrollTo(0, 0)
		if (e.target instanceof Element && e.target.textContent) {
			if (e.target.textContent == '1') {
				searchParams.delete('page')
			} else {
				searchParams.set('page', e.target.textContent)
			}
			setSearchParams(searchParams, { preventScrollReset: true })
			dispatch(listActions.change({ lazy: true, loading: true }))
		}
	}

	function createPagination() {
		const length = Math.ceil(countPagination / limit)
		const pagi: number[] = []
		for (let i = 1; i <= length; i++) {
			pagi.push(i)
		}
		return (
			<div
				className={cn(styles['ListPagination'], {
					[styles['ListPagination_hide']]: length == 1 || !length,
				})}
			>
				<button
					className={cn(styles['ListPagination__more'], {
						[styles['ListPagination__more_hide']]: page >= pagi.length,
					})}
					onClick={more}
					ref={moreRef}
				>
					Показать ещё товары
					<img src='/img/load/load.png' alt='' className={styles['ListPagination__load']} />
				</button>
				<div className={styles['pagination']}>
					<button
						className={cn(styles['pagination__button'], {
							[styles['pagination__button_hide']]: page == 1,
						})}
						onClick={prev}
					>
						<img src='/img/slider/arrow.png' alt='' className={styles['pagination__img_prev']} />
					</button>
					<button
						className={cn(styles['pagination__button'], styles['pagination__button_next'], {
							[styles['pagination__button_hide']]: page == pagi.length,
						})}
						onClick={next}
					>
						<img src='/img/slider/arrow.png' alt='' className={styles['pagination__img_next']} />
					</button>
					{pagi.map(el => (
						<button
							onClick={link}
							className={cn(styles['pagination__link'], {
								[styles['pagination__link_active']]: el == page,
								[styles['pagination__link_hide']]:
									(el > page + 2 && el > 5) || (el < page - 2 && el <= pagi.length - 5),
							})}
							key={el}
							ref={el == page ? activeRef : undefined}
						>
							{el}
						</button>
					))}
				</div>
			</div>
		)
	}

	return <>{createPagination()}</>
}
