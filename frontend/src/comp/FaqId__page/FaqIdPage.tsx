import React, { MouseEvent, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PREFIX } from '../../helpers/API'
import { faqIdData } from '../../interfaces/faqId.interface'
import styles from './FaqIdPage.module.scss'
import { FaqIdPageProps } from './FaqIdPage.props'

export function FaqIdPage({ page }: FaqIdPageProps) {
	const spoilerRef = useRef<HTMLHeadingElement>(null)

	useLayoutEffect(() => {
		const timer = setTimeout(() => {
			spoilerRef.current?.click()
		}, 10)
		return () => clearTimeout(timer)
	}, [])

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

	function createInsideTag(text: string, substring: string[], tag: string) {
		const newSubstring = substring.map(el => {
			return el.includes('+') || el.includes('-')
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
		ul: string[],
		link: string[] | undefined,
		strong: string[] | undefined,
	) {
		return (
			<ul>
				{ul.map((li, i) => {
					const text = link
						? createInsideTag(li, link, 'link')
						: strong
							? createInsideTag(li, strong, 'strong')
							: li
					return <li key={i}>{text}</li>
				})}
			</ul>
		)
	}

	function createTag(title: faqIdData) {
		const tag = title.tag.split(' ').filter(item => item.trim() !== '')
		return title.text.slice(1).map((el, i) => {
			const text =
				!Array.isArray(el) && title.link
					? createInsideTag(el, title.link, 'link')
					: !Array.isArray(el) && title.strong
						? createInsideTag(el, title.strong, 'strong')
						: el
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

	function createPage(title: faqIdData) {
		return (
			<div className={styles['spoiler']} key={title.id}>
				<h1 ref={title.id == 1 ? spoilerRef : null} onClick={accordion}>
					{title.id + '. ' + title.text[0]}
				</h1>
				<div className={styles['spoiler__cont']}>{createTag(title)}</div>
			</div>
		)
	}

	return <div>{page.map(el => createPage(el))}</div>
}
