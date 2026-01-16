import cn from 'classnames'
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Await, useLoaderData, useSearchParams } from 'react-router-dom'
import { ListFilter } from '../../comp/List__filter/ListFilter'
import { ListItems } from '../../comp/List__items/ListItems'
import { ListNav } from '../../comp/List__nav/ListNav'
import { ListPagination } from '../../comp/List__pagination/ListPagination'
import { ListSideBar } from '../../comp/List__sidebar/ListSideBar'
import { NotFound } from '../../comp/NotFound/NotFound'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import { filterData } from '../../interfaces/filter.interface'
import { itemData } from '../../interfaces/item.interface'
import { listActions } from '../../store/list.slice'
import { AppDispatch, RootState } from '../../store/store'
import styles from './List.module.scss'

export function List() {
	const {
		params,
		items,
		filter,
		pagination,
		listSearchParams,
		sliderNotFound,
	} = useLoaderData() as {
		params: string[]
		items: itemData[]
		filter: filterData
		pagination: number
		listSearchParams: {
			page: number
			limit: number
			sort: string
		}
		sliderNotFound: itemData[] | null
	}

	const [searchParams, setSearchParams] = useSearchParams()
	const { page, limit, sort } = listSearchParams
	const mainRef = useLoadPage()
	const listRef = useRef<HTMLDivElement>(null)
	const [itemsData, setItemsData] = useState<itemData[]>(items)
	const [moreData, setMoreData] = useState<itemData[]>([])
	const listState = useSelector((state: RootState) => state.list)
	const dispatch = useDispatch<AppDispatch>()

	useLayoutEffect(() => {
		if (sessionStorage.getItem('more')) {
			const oldItems = JSON.parse(sessionStorage.getItem('more') + '')
			setItemsData(oldItems)
			setMoreData(items)
		} else {
			setItemsData(items)
			setMoreData([])
		}
		sessionStorage.removeItem('more')
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
			}, 100)
		}
	}, [items, listState.lazy, mainRef])

	useEffect(() => {
		dispatch(listActions.change({ lazy: false, loading: false }))
		sessionStorage.removeItem('lazy')
		sessionStorage.removeItem('loader')
	}, [dispatch, items])

	useEffect(() => {
		window.onpopstate = () => {
			if (sessionStorage.getItem('loader') == 'List') {
				dispatch(listActions.change({ lazy: true, loading: false }))
			}
		}
	}, [dispatch])

	function loadMoreItems() {
		sessionStorage.setItem('more', JSON.stringify([...itemsData, ...moreData]))
	}

	return (
		<Suspense>
			<Await resolve={{ params, items, filter, pagination, sliderNotFound }}>
				{({
					params,
					items,
					filter,
					pagination,
					sliderNotFound,
				}: {
					params: string[]
					items: itemData[]
					filter: filterData
					pagination: number
					sliderNotFound: itemData[] | null
				}) => {
					return (
						<div
							className={cn({ [styles['list_background']]: !sliderNotFound })}
						>
							<div className={'main'} ref={mainRef}>
								{sliderNotFound && <NotFound sliderNotFound={sliderNotFound} />}
								{!sliderNotFound && (
									<>
										<div className={'sideBar'}>
											<ListNav params={params} brand={items[0]?.brand} />
											<ListSideBar
												limit={limit}
												sort={sort}
												listSearchParams={[searchParams, setSearchParams]}
											/>
										</div>
										<div className={styles['catalog']}>
											<ListFilter
												facets={filter}
												listSearchParams={[searchParams, setSearchParams]}
											/>
											<div className={styles['catalog__list']} ref={listRef}>
												<ListItems
													items={itemsData}
													more={moreData}
													style={{
														paddingBottom:
															Math.ceil(pagination / limit) == 1 ? '72px' : '0',
													}}
												/>
												<ListPagination
													countPagination={pagination}
													params={{ page, limit }}
													loadMoreItems={loadMoreItems}
													listSearchParams={[searchParams, setSearchParams]}
												/>
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					)
				}}
			</Await>
		</Suspense>
	)
}
