import cn from 'classnames'
import { MouseEvent, useContext, useEffect, useRef } from 'react'
import { HeaderContext } from '../../context/header.context'
import { useLink } from '../../hooks/use-link.hook'
import { HeaderMenuImg } from '../HeaderMenu__img/HeaderMenuImg'
import { HeaderMenuNav } from '../HeaderMenu__nav/HeaderMenuNav'
import styles from './HeaderMenuBlock.module.scss'
import { HeaderMenuBlockProps } from './HeaderMenuBlock.props'

export function HeaderMenuBlock({ params, name }: HeaderMenuBlockProps) {
	const menuNav = useRef<HTMLDivElement>(null)
	const { menuActive, setMenuActive } = useContext(HeaderContext)
	const linkTo = useLink()

	useEffect(() => {
		let timerId: number
		if (menuActive === name) {
			menuNav.current?.classList.add(styles['menu_active'], 'menu_active')
		} else {
			if (menuActive === '') {
				timerId = setTimeout(() => {
					menuNav.current?.classList.remove(styles['menu_active'], 'menu_active')
				}, 250)
			} else {
				menuNav.current?.classList.remove(styles['menu_active'], 'menu_active')
			}
		}
		return () => clearTimeout(timerId)
	}, [menuActive, name])

	function link(e: MouseEvent, to: string) {
		setMenuActive('')
		linkTo(e, to)
	}

	return (
		<div className={styles['menu']} ref={menuNav}>
			<div
				className={cn(styles['menuNav'], {
					[styles['menuNav_brand']]: name === 'Бренды',
				})}
			>
				<HeaderMenuNav name={name} ul={params.ul1} link={link} />
				<HeaderMenuNav name={name} ul={params.ul2} link={link} />
				{params.ul3 && <HeaderMenuNav name={name} ul={params.ul3} link={link} />}
				{params.ul4 && <HeaderMenuNav name={name} ul={params.ul4} link={link} />}
			</div>
			<div
				className={cn(styles['menuImg'], {
					[styles['menuImg_brand']]: name === 'Бренды',
				})}
			>
				<HeaderMenuImg name={name} img={params.img} link={link} />
			</div>
		</div>
	)
}
