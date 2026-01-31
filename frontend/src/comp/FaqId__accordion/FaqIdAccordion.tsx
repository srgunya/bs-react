import React, { MouseEvent, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import { PageData } from '../../interfaces/page.interface'
import styles from './FaqIdAccodrion.module.scss'
import { FaqIdAccordionProps } from './FaqIdAccordion.props'

export function FaqIdAccordion({ page }: FaqIdAccordionProps) {
	const spoilerRef = useRef<HTMLHeadingElement>(null)
	const location = useLocation()

	useEffect(() => {
		const timer = setTimeout(() => {
			spoilerRef.current?.click()
		}, 100)
		return () => clearTimeout(timer)
	}, [location])

	function accordion(e: MouseEvent) {
		const target = e.currentTarget.parentNode?.lastChild
		if (target instanceof HTMLElement) {
			e.currentTarget.classList.toggle(styles['spoiler__h1_open'])
			if (target.style.maxHeight) {
				target.style.maxHeight = ''
			} else {
				target.style.maxHeight = target.scrollHeight + 'px'
			}
		}
	}

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
		const text = useLink
			? createInsideTag(fragment, link, 'link')
			: useStrong
				? createInsideTag(fragment, strong, 'strong')
				: fragment
		return text
	}

	function createInsideTag(text: string, substring: string[], tag: string) {
		const newSubstring = substring.map(el => {
			return /[.*+?^${}()|[\]\\]/.test(el)
				? el.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
				: el
		})
		const regex = new RegExp(`(${newSubstring.join('|')})`, 'gi')
		const parts = text.split(regex).map((part, index) => {
			if (substring.some(word => word === part)) {
				return tag == 'link' ? (
					<Link key={index} to={'#'}>
						{part}
					</Link>
				) : tag == 'strong' ? (
					<strong key={index}>{part}</strong>
				) : (
					<></>
				)
			}
			return part
		})
		return <>{parts}</>
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

	function createPage(title: PageData) {
		return (
			<div className={styles['spoiler']} key={title.id + location.pathname}>
				<h1 ref={title.id == 1 ? spoilerRef : null} onClick={accordion}>
					{title.id + '. ' + title.text[0]}
				</h1>
				<div className={styles['spoiler__cont']}>{createTag(title)}</div>
			</div>
		)
	}

	return <div>{page.map(el => createPage(el))}</div>
}
