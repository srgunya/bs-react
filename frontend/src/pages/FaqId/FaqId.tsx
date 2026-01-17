import { Suspense, useLayoutEffect, useState } from 'react'
import { Await, useLoaderData, useParams } from 'react-router-dom'
import { ListNav } from '../../comp/List__nav/ListNav'
import { NotFound } from '../../comp/NotFound/NotFound'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import { itemData } from '../../interfaces/item.interface'
import { faq } from '../Faq/Faq.params'

export function FaqId() {
	const { sliderNotFound } = useLoaderData() as {
		sliderNotFound: itemData[] | null
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
			<Await resolve={{ sliderNotFound }}>
				{({ sliderNotFound }: { sliderNotFound: itemData[] | null }) => {
					return (
						<div className={'main'} ref={mainRef}>
							{sliderNotFound && <NotFound sliderNotFound={sliderNotFound} />}
							{!sliderNotFound && (
								<>
									<div className={'sideBar'}>
										<ListNav params={['Помощь покупателю', listNavParams]} />
									</div>
								</>
							)}
						</div>
					)
				}}
			</Await>
		</Suspense>
	)
}
