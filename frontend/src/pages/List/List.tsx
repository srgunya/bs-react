import { Suspense, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { itemData } from '../../comp/Index__item/IndexItem.props'
import { ListFilter } from '../../comp/List__filter/ListFilter'
import { filterData } from '../../comp/List__filter/ListFilter.props'
import { ListItems } from '../../comp/List__items/ListItems'
import { ListNav } from '../../comp/List__nav/ListNav'
import { ListPagination } from '../../comp/List__pagination/ListPagination'
import { ListSort } from '../../comp/List__sort/ListSort'
import { ListContext } from '../../context/list.context'
import { allLink } from '../../helpers/linksHeader'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import styles from './List.module.scss'

export function List() {
	const { params, items, filter, pagination, listSearchParams } = useLoaderData() as {
		params: string[]
		items: itemData[]
		filter: filterData
		pagination: number
		listSearchParams: {
			page: number
			limit: number
			sort: string
		}
	}
	const { page, limit, sort } = listSearchParams
	const mainRef = useLoadPage()
	const listRef = useRef<HTMLDivElement>(null)
	const [itemsData, setItemsData] = useState<itemData[]>(items)
	const [moreData, setMoreData] = useState<itemData[]>([])
	const { listState, setListState } = useContext(ListContext)
	const [scrollToTop, setScrollToTop] = useState(false)

	useLayoutEffect(() => {
		if (sessionStorage.getItem('more')) {
			const oldItems = JSON.parse(sessionStorage.getItem('more') + '')
			setItemsData(oldItems)
			setMoreData(items)
		} else {
			setItemsData(items)
			setMoreData([])
		}
	}, [items])

	useLayoutEffect(() => {
		if (listState.loading) {
			listRef.current?.classList.add(styles['catalog__list_loading'])
		} else {
			listRef.current?.classList.remove(styles['catalog__list_loading'])
		}
	}, [listState.loading])

	useLayoutEffect(() => {
		sessionStorage.setItem('lazy', JSON.stringify(items))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listState.lazy])

	useLayoutEffect(() => {
		const bool = sessionStorage.getItem('lazy') !== JSON.stringify(items)
		if (listState.lazy && bool) {
			mainRef.current?.classList.remove('lazy__img')
			setTimeout(() => {
				mainRef.current?.classList.add('lazy__img')
			}, 300)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items])

	useLayoutEffect(() => {
		if (scrollToTop) {
			window.scrollTo(0, 0)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items])

	useEffect(() => {
		setListState({ lazy: false, loading: false })
		sessionStorage.removeItem('lazy')
		sessionStorage.removeItem('more')
		setScrollToTop(false)
	}, [items, setListState])

	useEffect(() => {
		window.onpopstate = () => {
			const searchTerm = location.pathname
			const effect = allLink().find(el => el == searchTerm)
			if (effect) {
				setListState({ lazy: true, loading: true })
				setScrollToTop(true)
			}
		}
	}, [items, setListState])

	function loadMoreItems() {
		sessionStorage.setItem('more', JSON.stringify([...itemsData, ...moreData]))
	}

	return (
		<Suspense>
			<Await resolve={{ params, items, filter, pagination }}>
				{({
					params,
					items,
					filter,
					pagination,
				}: {
					params: string[]
					items: itemData[]
					filter: filterData
					pagination: number
				}) => {
					return (
						items.length != 0 && (
							<div className={styles['list_background']}>
								<div className={'main'} ref={mainRef}>
									<div className={styles['sideBar']}>
										<ListNav params={params} brand={items[0].brand} />
										<ListSort limit={limit} sort={sort} />
									</div>
									<div className={styles['catalog']}>
										<ListFilter facets={filter} />
										<div className={styles['catalog__list']} ref={listRef}>
											<ListItems items={itemsData} more={moreData} />
											<ListPagination
												countPagination={pagination}
												params={{ page, limit }}
												loadMoreItems={loadMoreItems}
											/>
										</div>
									</div>
								</div>
							</div>
						)
					)
				}}
			</Await>
		</Suspense>
	)
}
