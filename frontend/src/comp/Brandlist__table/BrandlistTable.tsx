import cn from 'classnames'
import { forwardRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './BrandlistTable.module.scss'
import { soon } from './BrandlistTable.params'
import { BrandlistTableProps } from './BrandlistTable.props'

export const BrandlistTable = forwardRef<HTMLDivElement, BrandlistTableProps>(
	function BrandlistTable({ table }, ref) {
		const [block, setBlock] = useState(table)

		useEffect(() => {
			const newState = { ...block }
			Object.keys(newState).forEach(letter => {
				if (newState[letter].length == 0) {
					delete newState[letter]
					setBlock(newState)
				} else {
					newState[letter].sort()
					setBlock(newState)
				}
			})
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [table])

		return (
			<div className={styles['table']} ref={ref}>
				{Object.keys(block).map(letter => {
					return (
						<div className={styles['table__block']} key={letter}>
							<span className={styles['table__letter']}>{letter}</span>
							<ul className={styles['table__ul']}>
								{block[letter].map(brand => {
									return (
										<li className={styles['table__brand']} key={brand}>
											<Link
												to={`/${brand
													.toLowerCase()
													.replaceAll(' ', '-')
													.replaceAll('.', '')}`}
												className={cn(styles['table__link'], {
													[styles['table__link_soon']]: soon.includes(brand),
												})}
											>
												{brand}
											</Link>
											{soon.includes(brand) && (
												<span className={styles['table__soon']}>Скоро</span>
											)}
										</li>
									)
								})}
							</ul>
						</div>
					)
				})}
			</div>
		)
	}
)
