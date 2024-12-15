import { Suspense, useLayoutEffect, useState } from 'react'
import { Await, useLoaderData, useSearchParams } from 'react-router-dom'
import { itemData } from '../../comp/Index__slider_item/IndexSliderItem.props'
import { ListFilter } from '../../comp/List__filter/ListFilter'
import { filterData, filterParamsType } from '../../comp/List__filter/ListFilter.props'
import { ListItems } from '../../comp/List__items/ListItems'
import { ListNav } from '../../comp/List__nav/ListNav'
import { ListPagination } from '../../comp/List__pagination/ListPagination'
import { ListSort } from '../../comp/List__sort/ListSort'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import { getFilter, getList, getPagination } from '../../loaders/getDataList'
import styles from './List.module.scss'

export function List() {
	const { params, items, pagination, page, limit, sort, filter, filterParams } =
		useLoaderData() as {
			params: string[]
			items: itemData[]
			pagination: string
			page: number
			limit: number
			sort: string
			filter: filterData
			filterParams: filterParamsType
		}
	const [search] = useSearchParams()
	const mainRef = useLoadPage(search)
	const [itemsData, setItemsData] = useState(items)
	const [more, setMore] = useState<itemData[]>([])
	const [searchParams, setSearchParams] = useState({ page: page, limit: limit, sort: sort })
	const [filParams, setFilParams] = useState(filterParams)
	const [pag, setPag] = useState(pagination)
	const [fil, setFil] = useState(filter)

	useLayoutEffect(() => {
		mainRef.current?.classList.remove('list_loading')
		window.scrollTo(0, 0)
		setSearchParams({ page: page, limit: limit, sort: sort })
		setFilParams(filterParams)
		setPag(pagination)
		setFil(filter)
		setMore([])
		setItemsData(items)
	}, [params, items, pagination, page, limit, sort, filterParams, filter, mainRef])

	async function loadMoreData() {
		mainRef.current?.classList.add('list_loading')
		await new Promise(resolve => {
			setTimeout(() => {
				getList(
					params,
					searchParams.page + 1,
					searchParams.limit,
					searchParams.sort,
					filParams
				).then(data => {
					if (more.length > 0) {
						setItemsData(state => [...state, ...more])
					}
					setMore(data)
					setSearchParams(state => ({ ...state, page: state.page + 1 }))
					setTimeout(() => {
						mainRef.current?.classList.remove('list_loading')
					}, 1)
					resolve(data)
				})
			}, 300)
		})
	}

	async function reRender(limit: number, sort: string) {
		mainRef.current?.classList.add('list_loading')
		await new Promise(resolve => {
			setTimeout(() => {
				getList(params, 1, limit, sort, filParams).then(data => {
					setItemsData(data)
					setMore([])
					setSearchParams({ page: 1, limit: limit, sort: sort })
					setTimeout(() => {
						mainRef.current?.classList.remove('list_loading')
					}, 1)
					resolve(data)
				})
			}, 300)
		})
	}

	async function startFilter(name: string, search: string[]) {
		mainRef.current?.classList.add('list_loading')
		setFilParams(state => {
			return { ...state, [name]: search }
		})
		const bodyPost = { ...filParams, [name]: search }
		const p1 = new Promise(resolve => {
			getPagination(params, bodyPost).then(data => {
				setPag(data)
				resolve(data)
			})
		})
		const p2 = new Promise(resolve => {
			getFilter(params, bodyPost).then(data => {
				setFil(data)
				resolve(data)
			})
		})
		const p3 = new Promise(resolve => {
			setTimeout(() => {
				getList(params, 1, searchParams.limit, searchParams.sort, bodyPost).then(data => {
					setItemsData(data)
					setMore([])
					setSearchParams(state => {
						return { ...state, page: 1 }
					})
					resolve(data)
				})
			}, 300)
		})
		Promise.all([p1, p2, p3]).then(() => {
			setTimeout(() => {
				mainRef.current?.classList.remove('list_loading')
			}, 1)
		})
	}

	return (
		<Suspense>
			<Await resolve={{ params, items, pagination, filter, filterParams }}>
				{({ params, items }: { params: string[]; items: itemData[] }) => {
					return (
						items.length > 0 && (
							<div className={styles['list_background']}>
								<div className={'main'} ref={mainRef}>
									<div className={styles['listHeader']}>
										<ListNav params={params} brand={items[0].brand} />
										<ListSort
											limit={searchParams.limit}
											sort={searchParams.sort}
											reRender={reRender}
										/>
									</div>
									<div className={styles['catalog']}>
										<ListFilter facets={fil} filterParams={filParams} startFilter={startFilter} />
										<ListItems items={itemsData} more={more} />
										<ListPagination
											pagination={pag}
											searchParams={searchParams}
											loadMoreData={loadMoreData}
										/>
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
