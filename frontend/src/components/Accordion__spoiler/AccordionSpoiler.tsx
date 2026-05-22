import cn from 'classnames'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import { PageData } from '../../interfaces/page.interface'
import styles from './AccordionSpoiler.module.scss'
import { AccordionSpoilerProps } from './AccordionSpoiler.props'

export function AccordionSpoiler({
	spoiler,
	checkInsideTag,
}: AccordionSpoilerProps) {
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const elementRefs = useRef<Record<string, HTMLElement | null>>({})
	const location = useLocation()

	function setRef(id: string) {
		return function (el: HTMLElement | null) {
			elementRefs.current[id] = el
		}
	}

	useEffect(() => {
		setSelectedId(null)
		const timer = setTimeout(() => {
			const firstElement = elementRefs.current['btn0']
			if (firstElement instanceof HTMLElement) {
				firstElement.click()
			}
			elementRefs.current['btn0']?.classList.remove(
				styles['spoiler__h1_open_default'],
			)
			elementRefs.current['btn0']?.nextElementSibling?.classList.remove(
				styles['spoiler__cont_default'],
			)
		}, 100)
		return () => clearTimeout(timer)
	}, [location])

	function accordion(e: MouseEvent, id: string) {
		if (selectedId !== null && selectedId !== id) {
			const prevElement = elementRefs.current[selectedId]
			if (
				prevElement instanceof HTMLElement &&
				prevElement.classList.contains(styles['spoiler__h1_open'])
			) {
				prevElement.click()
			}
		}
		const target = e.currentTarget.parentNode?.lastChild
		if (target instanceof HTMLElement) {
			e.currentTarget.classList.toggle(styles['spoiler__h1_open'])
			if (target.style.maxHeight) {
				target.style.maxHeight = ''
			} else {
				target.style.maxHeight = target.scrollHeight + 'px'
			}
		}
		setSelectedId(id)
	}

	function createUl(
		ul: (string | string[])[],
		link: string[] | undefined,
		strong: string[] | undefined,
	) {
		return (
			<ul>
				{ul.map((li, i) => {
					const text = checkInsideTag(li, link, strong)
					return (
						<li key={i}>
							{Array.isArray(text) ? createUl(text, link, strong) : text}
						</li>
					)
				})}
			</ul>
		)
	}

	function createTag(title: PageData) {
		const tag = title.tag.split(' ').filter(item => item.trim() !== '')
		return title.text.slice(1).map((el, i) => {
			const text = checkInsideTag(el, title.link, title.strong)
			return (
				<React.Fragment key={i}>
					{tag[i] == 'img' && <img src={PREFIX + text}></img>}
					{tag[i] == 'h2' && <h2>{text}</h2>}
					{tag[i] == 'h3' && <h3>{text}</h3>}
					{tag[i] == 'h4' && <h4>{text}</h4>}
					{tag[i] == 'p' && <p>{text}</p>}
					{tag[i] == 'info' && (
						<p className={styles['spoiler__info']}>{text}</p>
					)}
					{tag[i] == 'ul' &&
						Array.isArray(el) &&
						createUl(el, title.link, title.strong)}
				</React.Fragment>
			)
		})
	}

	function createSpoiler(title: PageData, i: number) {
		return (
			<div className={styles['spoiler']} key={title.id + location.pathname}>
				<h1
					ref={setRef(`btn${i}`)}
					onClick={e => accordion(e, `btn${i}`)}
					className={cn({
						[styles['spoiler__h1_open_default']]: i == 0,
					})}
				>
					{title.id + '. ' + title.text[0]}
				</h1>
				<div
					className={cn(styles['spoiler__cont'], {
						[styles['spoiler__cont_default']]: i == 0,
					})}
				>
					{createTag(title)}
				</div>
			</div>
		)
	}

	return <div>{spoiler.map((el, i) => createSpoiler(el, i))}</div>
}
