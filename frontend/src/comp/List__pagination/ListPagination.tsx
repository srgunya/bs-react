import cn from 'classnames'
import { MouseEvent, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './ListPagination.module.scss'
import { ListPaginationProps } from './ListPagination.props'
export function ListPagination({ pagination, page, loadMoreData }: ListPaginationProps) {
	const location = useLocation()
	const activeRef = useRef<HTMLAnchorElement>(null)

	function next() {
		if (activeRef.current?.nextElementSibling instanceof HTMLAnchorElement) {
			activeRef.current?.nextElementSibling.click()
		}
	}
	function prev() {
		if (activeRef.current?.previousElementSibling instanceof HTMLAnchorElement) {
			activeRef.current?.previousElementSibling.click()
		}
	}

	function more(e: MouseEvent) {
		if (
			e.target instanceof Element &&
			e.target.parentNode?.parentNode?.parentNode instanceof Element
		) {
			if (e.target.parentNode?.parentNode?.parentNode.classList.contains('list_loading')) {
				return false
			} else {
				history.pushState(null, '', `${location.pathname}?page=${page + 1}`)
				loadMoreData()
			}
		}
	}
	function link(e: MouseEvent) {
		if (
			e.target instanceof Element &&
			e.target.parentNode?.parentNode?.parentNode?.parentNode instanceof Element
		) {
			if (
				e.target.parentNode?.parentNode?.parentNode?.parentNode.classList.contains('list_loading')
			) {
				e.preventDefault()
			} else {
				e.target.parentNode?.parentNode?.parentNode?.parentNode.classList.add('list_loading')
			}
		}
	}

	function createPagination() {
		const length = Math.ceil(Number(pagination) / 20)
		const pagi: number[] = []
		for (let i = 1; i <= length; i++) {
			pagi.push(i)
		}
		return (
			<div
				className={cn(styles['ListPagination'], {
					[styles['ListPagination_hide']]: length == 1,
				})}
			>
				<button
					className={cn(styles['ListPagination__more'], 'ListPagination__more', {
						[styles['ListPagination__more_hide']]: page >= pagi.length,
					})}
					onClick={more}
				>
					Показать ещё товары
					<img
						src='/img/load/load.png'
						alt=''
						className={cn(styles['ListPagination__load'], 'ListPagination__load')}
					/>
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
						<Link
							to={el == 1 ? `${location.pathname}` : `${location.pathname}?page=${el}`}
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
						</Link>
					))}
				</div>
			</div>
		)
	}

	return <>{createPagination()}</>
}
