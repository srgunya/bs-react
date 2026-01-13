import { Suspense, useRef } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { BrandlistBoard } from '../../comp/Brandlist__board/BrandlistBoard'
import { BrandlistTable } from '../../comp/Brandlist__table/BrandlistTable'
import { ListNav } from '../../comp/List__nav/ListNav'
import { brandListData } from '../../interfaces/brandList.interface'

export function Brandlist() {
	const { lang, table } = useLoaderData() as {
		lang: string
		table: brandListData
	}
	const ref = useRef<HTMLDivElement>(null)

	return (
		<Suspense>
			<Await resolve={{ lang, table }}>
				{({ lang, table }: { lang: string; table: brandListData }) => {
					return (
						<div className={'main'}>
							<div className={'sideBar'}>
								<ListNav params={['Бренды']} brand={''} />
							</div>
							<BrandlistBoard lang={lang} table={table} linkRef={ref} />
							<BrandlistTable table={table} ref={ref} />
						</div>
					)
				}}
			</Await>
		</Suspense>
	)
}
