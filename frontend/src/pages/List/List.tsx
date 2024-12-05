import { Suspense, useLayoutEffect, useState } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { itemData } from '../../comp/Index__slider_item/IndexSliderItem.props'
import { ListFilter } from '../../comp/List__filter/ListFilter'
import { ListItems } from '../../comp/List__items/ListItems'
import { ListNav } from '../../comp/List__nav/ListNav'
import { ListPagination } from '../../comp/List__pagination/ListPagination'
import { ListSort } from '../../comp/List__sort/ListSort'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import { getItems } from '../../loaders/getDataList'
import styles from './List.module.scss'

export function List() {
	const { params, items, pagination, page } = useLoaderData() as {
		params: string[]
		items: itemData[]
		pagination: string
		page: number
	}
	const mainRef = useLoadPage()
	const [itemsData, setItemsData] = useState(items)
	const [activePage, setActivePage] = useState(page)
	const [more, setMore] = useState<itemData[]>([])

	useLayoutEffect(() => {
		mainRef.current?.classList.remove('list_loading')
		window.scrollTo(0, 0)
		setActivePage(page)
		setMore([])
		setItemsData(items)
	}, [params, items, pagination, page, mainRef])

	async function loadMoreData() {
		mainRef.current?.classList.add('list_loading')
		await new Promise(resolve => {
			setTimeout(() => {
				getItems(params, activePage + 1).then(data => {
					if (more.length > 0) {
						setItemsData(state => [...state, ...more])
					}
					setMore(data)
					setActivePage(state => state + 1)
					setTimeout(() => {
						mainRef.current?.classList.remove('list_loading')
					}, 1)
					resolve(data)
				})
			}, 300)
		})
	}

	return (
		<Suspense>
			<Await resolve={{ params, items, pagination }}>
				{({
					params,
					items,
					pagination,
				}: {
					params: string[]
					items: itemData[]
					pagination: string
				}) => {
					return (
						<div className={styles['list_background']}>
							<div className={'main'} ref={mainRef}>
								<div className={styles['listHeader']}>
									<ListNav params={params} items={items} />
									<ListSort />
								</div>
								<div className={styles['catalog']}>
									<ListFilter />
									<ListItems items={itemsData} more={more} />
									<ListPagination
										pagination={pagination}
										page={activePage}
										loadMoreData={loadMoreData}
									/>
								</div>
							</div>
						</div>
					)
				}}
			</Await>
		</Suspense>
	)
}
