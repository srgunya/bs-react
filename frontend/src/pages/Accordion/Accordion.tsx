import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { Await, Link, useLoaderData } from 'react-router-dom'
import { AccordionInfo } from '../../components/Accordion__info/AccordionInfo'
import { AccordionSpoiler } from '../../components/Accordion__spoiler/AccordionSpoiler'
import { ListNav } from '../../components/List__nav/ListNav'
import { NotFound } from '../../components/NotFound/NotFound'
import { useLoadPage } from '../../hooks/use-loadPage.hook'
import { itemData } from '../../interfaces/item.interface'
import { PageData } from '../../interfaces/page.interface'

export function Accordion() {
	const { sliderNotFound, dataPage, navParams } = useLoaderData() as {
		sliderNotFound: itemData[] | null
		dataPage: PageData[] | null
		navParams: string[]
	}
	const mainRef = useLoadPage()
	const [info, setInfo] = useState<PageData | null>(null)
	const [spoiler, setSpoiler] = useState(dataPage)

	useEffect(() => {
		if (spoiler && spoiler[0].id == 0) {
			const [first, ...rest] = spoiler
			setInfo(first)
			setSpoiler(rest)
		}
	}, [dataPage, spoiler])

	useLayoutEffect(() => {
		setSpoiler(dataPage)
		setInfo(null)
	}, [dataPage])

	function checkInsideTag(
		fragment: string | (string | string[])[],
		link: string[] | undefined,
		strong: string[] | undefined,
	) {
		const useLink =
			!Array.isArray(fragment) &&
			link &&
			link.some(word => fragment.includes(word))
		const useStrong =
			!Array.isArray(fragment) &&
			strong &&
			strong.some(word => fragment.includes(word))
		const text =
			useLink && useStrong
				? createInsideTag(fragment, { link, strong })
				: useLink
					? createInsideTag(fragment, { link })
					: useStrong
						? createInsideTag(fragment, { strong })
						: fragment
		return text
	}

	function createInsideTag(
		text: string,
		substring: { [key: string]: string[] },
	) {
		const keys = Object.keys(substring)
		const concatSubstring =
			keys.length == 1
				? substring[keys[0]]
				: substring[keys[0]].concat(substring[keys[1]])
		const newSubstring = concatSubstring.map(el => {
			return /[.*+?^${}()|[\]\\]/.test(el)
				? el.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				: el
		})
		const regex = new RegExp(`(${newSubstring.join('|')})`, 'gi')
		const parts = text.split(regex).map((part, index) => {
			const currentKey = keys.find(key =>
				substring[key].some(word => word.toLowerCase() === part.toLowerCase()),
			)
			if (currentKey) {
				if (currentKey === 'link') {
					return (
						<Link key={index} to={'#'}>
							{part}
						</Link>
					)
				}
				if (currentKey === 'strong') {
					return <strong key={index}>{part}</strong>
				}
				return <React.Fragment key={index} />
			}
			return part
		})
		return <>{parts}</>
	}

	return (
		<Suspense>
			<Await resolve={{ sliderNotFound, dataPage, navParams }}>
				{({
					sliderNotFound,
					navParams,
				}: {
					sliderNotFound: itemData[] | null
					navParams: string[]
				}) => {
					return (
						<div className={'main'} ref={mainRef}>
							{sliderNotFound && <NotFound sliderNotFound={sliderNotFound} />}
							{spoiler && (
								<>
									<div className={'sideBar'}>
										<ListNav params={navParams} />
									</div>
									{info && (
										<AccordionInfo
											info={info}
											checkInsideTag={checkInsideTag}
										/>
									)}
									<AccordionSpoiler
										spoiler={spoiler}
										checkInsideTag={checkInsideTag}
									/>
								</>
							)}
						</div>
					)
				}}
			</Await>
		</Suspense>
	)
}
