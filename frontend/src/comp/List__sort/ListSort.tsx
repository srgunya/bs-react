import cn from 'classnames'
import React, { MouseEvent, useRef, useState } from 'react'
import styles from './ListSort.module.scss'

export function ListSort() {
	const [length, setLength] = useState('Показывать: 20')
	const [sort, setSort] = useState('Сортировка')
	const lengthRef = useRef<HTMLUListElement>(null)
	const sortRef = useRef<HTMLUListElement>(null)

	function click(
		e: MouseEvent,
		ref: HTMLUListElement | null,
		setState: React.Dispatch<React.SetStateAction<string>>
	) {
		if (
			e.target instanceof Element &&
			e.target.parentNode instanceof Element &&
			e.target.textContent
		) {
			setState(e.target.textContent)

			if (e.target == e.target.parentNode.childNodes[0]) {
				ref?.classList.toggle(styles['listSort__ul_active'])
				return
			}

			e.target.parentNode.childNodes.forEach(el => {
				if (el instanceof Element) {
					el.classList.remove(styles['listSort__li_active'])
				}
			})
			e.target.classList.add(styles['listSort__li_active'])
		}
	}

	function open(ref: HTMLUListElement | null) {
		ref?.classList.add(styles['listSort__ul_active'])
		return
	}
	function close(ref: HTMLUListElement | null) {
		ref?.classList.remove(styles['listSort__ul_active'])
		return
	}

	return (
		<div className={styles['listSort']}>
			<ul
				className={cn(styles['listSort__ul'], styles['listSort__ul_length'])}
				onClick={e => {
					click(e, lengthRef.current, setLength)
				}}
				onMouseEnter={() => {
					open(lengthRef.current)
				}}
				onMouseLeave={() => {
					close(lengthRef.current)
				}}
				ref={lengthRef}
			>
				<li className={styles['listSort__li']}>
					{length} <img src='/img/slider/arrow.png' alt='' className={styles['listSort__img']} />
				</li>
				<li className={cn(styles['listSort__li'], styles['listSort__li_active'])}>
					Показывать: 20
				</li>
				<li className={styles['listSort__li']}>Показывать: 40</li>
				<li className={styles['listSort__li']}>Показывать: 80</li>
			</ul>
			<ul
				className={cn(styles['listSort__ul'], styles['listSort__ul_sort'])}
				onClick={e => {
					click(e, sortRef.current, setSort)
				}}
				onMouseEnter={() => {
					open(sortRef.current)
				}}
				onMouseLeave={() => {
					close(sortRef.current)
				}}
				ref={sortRef}
			>
				<li className={styles['listSort__li']}>
					{sort} <img src='/img/slider/arrow.png' alt='' className={styles['listSort__img']} />
				</li>
				<li className={cn(styles['listSort__li'], styles['listSort__li_active'])}>По умолчанию</li>
				<li className={styles['listSort__li']}>По возрастанию цены</li>
				<li className={styles['listSort__li']}>По убыванию цены</li>
			</ul>
		</div>
	)
}
