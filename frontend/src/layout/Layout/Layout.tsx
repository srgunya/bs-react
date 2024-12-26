import { lazy, Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from '../../comp/Footer/Footer'
import { Header } from '../../comp/Header/Header'
import { HeaderContextProvider } from '../../context/header.context'
import { ListContextProvider } from '../../context/list.context'
import styles from './Layout.module.scss'

const HeaderMenu = lazy(() => import('../../comp/HeaderMenu/HeaderMenu'))

export function Layout() {
	return (
		<div className={styles['layout']}>
			<ScrollRestoration />
			<ListContextProvider>
				<HeaderContextProvider>
					<Header />
					<Suspense>
						<HeaderMenu />
					</Suspense>
				</HeaderContextProvider>
				<Outlet />
			</ListContextProvider>
			<Footer />
		</div>
	)
}
