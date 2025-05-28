import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { IndexBanner } from '../../comp/Index__banner/IndexBanner'
import { IndexInfo } from '../../comp/Index__info/IndexInfo'
import { IndexSex } from '../../comp/Index__sex/IndexSex'
import { IndexSliderItem } from '../../comp/Index__slider_item/IndexSliderItem'
import { IndexSliderLogo } from '../../comp/Index__slider_logo/IndexSliderLogo'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import { itemData } from '../../interfaces/item.interface'
import { logoData } from '../../interfaces/logo.interface'

export function Index() {
	const { logos, news, pop } = useLoaderData() as {
		logos: logoData[]
		news: itemData[]
		pop: itemData[]
	}
	const mainRef = useLoadPage()

	function divideArr<T>(num: number, arr: T[]) {
		const size = num
		const subarray: T[][] = []
		for (let i = 0; i < Math.ceil(arr.length / size); i++) {
			subarray[i] = arr.slice(i * size, i * size + size)
		}
		return subarray
	}

	return (
		<Suspense>
			<Await resolve={{ logos, news, pop }}>
				{({
					logos,
					news,
					pop,
				}: {
					logos: logoData[]
					news: itemData[]
					pop: itemData[]
				}) => {
					return (
						<div className={'main'} ref={mainRef}>
							<IndexSex />
							<IndexSliderLogo
								name='Популярные бренды'
								logos={logos}
								divideArr={divideArr}
							/>
							<IndexBanner />
							<IndexSliderItem
								name='Новые поступления'
								items={news}
								divideArr={divideArr}
							/>
							<IndexInfo />
							<IndexSliderItem
								name='Популярные товары'
								items={pop}
								divideArr={divideArr}
							/>
						</div>
					)
				}}
			</Await>
		</Suspense>
	)
}
