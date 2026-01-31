import { Suspense, useLayoutEffect, useState } from 'react'
import { Await, useLoaderData, useParams } from 'react-router-dom'
import { FaqIdAccordion } from '../../comp/FaqId__accordion/FaqIdAccordion'
import { ListNav } from '../../comp/List__nav/ListNav'
import { NotFound } from '../../comp/NotFound/NotFound'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import { itemData } from '../../interfaces/item.interface'
import { PageData } from '../../interfaces/page.interface'
import { faq } from '../Faq/Faq.params'

export function FaqId() {
	const { sliderNotFound, dataPage } = useLoaderData() as {
		sliderNotFound: itemData[] | null
		dataPage: PageData[] | null
	}
	const mainRef = useLoadPage()
	const id = useParams()
	const [listNavParams, setListNavParams] = useState('')

	useLayoutEffect(() => {
		const newState = faq.filter(el => id.faqId == el.to.slice(0, -1))[0]?.h1
		setListNavParams(newState)
	}, [id])

	return (
		<Suspense>
			<Await resolve={{ sliderNotFound, dataPage }}>
				{({
					sliderNotFound,
					dataPage,
				}: {
					sliderNotFound: itemData[] | null
					dataPage: PageData[] | null
				}) => {
					return (
						<div className={'main'} ref={mainRef}>
							{sliderNotFound && <NotFound sliderNotFound={sliderNotFound} />}
							{dataPage && (
								<>
									<div className={'sideBar'}>
										<ListNav params={['Помощь покупателю', listNavParams]} />
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
