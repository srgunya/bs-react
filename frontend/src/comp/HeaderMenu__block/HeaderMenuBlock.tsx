import cn from 'classnames'
import { MouseEvent, useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { HeaderContext } from '../../context/header.context'
import { listActions } from '../../store/list.slice'
import { AppDispatch } from '../../store/store'
import { HeaderMenuImg } from '../HeaderMenu__img/HeaderMenuImg'
import { HeaderMenuNav } from '../HeaderMenu__nav/HeaderMenuNav'
import styles from './HeaderMenuBlock.module.scss'
import { HeaderMenuBlockProps } from './HeaderMenuBlock.props'

export function HeaderMenuBlock({ params, name }: HeaderMenuBlockProps) {
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const navi = useNavigate()
	const menuNav = useRef<HTMLDivElement>(null)
	const { menuActive, setMenuActive } = useContext(HeaderContext)
	const dispatch = useDispatch<AppDispatch>()

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
		e.preventDefault()
		setMenuActive('')
		if (location.pathname == to && !searchParams.size) {
			return false
		} else {
			dispatch(listActions.change({ lazy: true, loading: true }))
			navi(to)
		}
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
