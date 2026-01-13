import 'normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom'
import { LazyLoader } from './helpers/LazyLoader'
import { itemData } from './interfaces/item.interface'
import { logoData } from './interfaces/logo.interface'
import { Layout } from './layout/Layout/Layout'
import { getDataBrandlist } from './loaders/getDataBrandlist'
import {
	getFilter,
	getList,
	getPagination,
	getSearchParams,
} from './loaders/getDataList'
import { getDataSlider } from './loaders/getDataSlider'
import './main.scss'
import { Brandlist } from './pages/BrandList/BrandList'
import { Faq } from './pages/Faq/Faq'
import { Index } from './pages/Index/Index'
import { List } from './pages/List/List'
import { store } from './store/store'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Index />,
				loader: async () => {
					await LazyLoader()
					return defer({
						logos: await getDataSlider<logoData>('/logoCount', '/getLogoById'),
						news: await getDataSlider<itemData>('/itemCount', '/getItemById'),
						pop: await getDataSlider<itemData>('/itemCount', '/getItemById'),
					})
				},
			},
			{
				path: '/brandlist',
				element: <Brandlist />,
				loader: async () => {
					await LazyLoader()
					return defer({
						lang: await getDataBrandlist('lang'),
						table: await getDataBrandlist('table'),
					})
				},
			},
			{
				path: '*',
				element: <List />,
				loader: async ({ params, request }) => {
					await LazyLoader()
					sessionStorage.setItem('loader', 'List')
					const { props, page, limit, sort, filterParams } =
						await getSearchParams(params, request)
					return defer({
						items: await getList(props, page, limit, sort, filterParams),
						filter: await getFilter(props, filterParams),
						pagination: await getPagination(props, filterParams),
						listSearchParams: { page, limit, sort },
						params: props,
					})
				},
			},
			{
				path: '/faq',
				element: <Faq />,
				loader: async () => {
					await LazyLoader()
					return null
				},
			},
		],
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	</StrictMode>
)
