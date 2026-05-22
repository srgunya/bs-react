import cn from 'classnames'
import { MouseEvent, useRef } from 'react'
import styles from './brandlistBoard.module.scss'
import { BrandlistBoardProps } from './BrandlistBoard.props'

export function BrandlistBoard({ lang, table, linkRef }: BrandlistBoardProps) {
	const ref = useRef<HTMLUListElement>(null)

	function scroll(letter: string, e: MouseEvent) {
		if (e.currentTarget.classList.contains(styles['board__lang_disable'])) {
			return
		}
		if (linkRef.current != null) {
			const tableBlocks = [...linkRef.current.children]
			tableBlocks.forEach(el => {
				if (el.firstChild?.textContent == letter) {
					const a = el as HTMLElement
					const b = ref.current!.getBoundingClientRect()
					window.scrollBy({
						top: a.offsetTop - b.height - 130 - window.pageYOffset,
						behavior: 'smooth',
					})
				}
			})
		}
	}

	return (
		<ul className={styles['board']} ref={ref}>
			{lang.split('').map(el => {
				return (
					<li
						className={cn(styles['board__lang'], {
							[styles['board__lang_disable']]: table[el].length == 0,
						})}
						onClick={e => scroll(el, e)}
						key={el}
					>
						{el}
					</li>
				)
			})}
		</ul>
	)
}
