import { Suspense, useEffect, useState } from 'react'
import { Await, useLoaderData, useLocation } from 'react-router-dom'
import { FaqIdAccordion } from '../../comp/FaqId__accordion/FaqIdAccordion'
import { ListNav } from '../../comp/List__nav/ListNav'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import { PageData } from '../../interfaces/page.interface'

export function OfertaPrivacy() {
	const { dataPage } = useLoaderData() as {
		dataPage: PageData[] | null
	}
	const mainRef = useLoadPage()
	const location = useLocation()
	const [navParams, setNavParams] = useState('')
	useEffect(() => {
		const navParams =
			location.pathname == '/oferta/'
				? 'Пользовательское соглашение'
				: location.pathname == '/privacy/'
					? 'Политика конфиденциальности'
					: ''
		setNavParams(navParams)
	}, [location])
	return (
		<Suspense>
			<Await resolve={{ dataPage }}>
				{({ dataPage }: { dataPage: PageData[] | null }) => {
					return (
						<div className={'main'} ref={mainRef}>
							{dataPage && (
								<>
									<div className={'sideBar'}>
										<ListNav params={[navParams]} />
									</div>
									<FaqIdAccordion page={dataPage} />
								</>
							)}
						</div>
					)
				}}
			</Await>
		</Suspense>
	)
}
