import cn from 'classnames'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { HeaderContextProvider } from '../../context/header.context'
import styles from './Layout.module.scss'

const HeaderMenu = lazy(() => import('../../components/HeaderMenu/HeaderMenu'))

export function Layout() {
	const [timer, setTimer] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimer(true)
		}, 100)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div className={cn(styles['layout'])}>
			{timer && <ScrollRestoration />}
			<HeaderContextProvider>
				<Header />
				<Suspense>
					<HeaderMenu />
				</Suspense>
			</HeaderContextProvider>
			<Outlet />
			<Footer />
		</div>
	)
}
