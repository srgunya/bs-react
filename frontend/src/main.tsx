import 'normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom'
import { lazyLoader } from './helpers/lazyLoader'
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
import { getDataPage } from './loaders/getDataPage'
import { getDataSlider } from './loaders/getDataSlider'
import { notFound } from './loaders/notFound'
import './main.scss'
import { Brandlist } from './pages/BrandList/BrandList'
import { Faq } from './pages/Faq/Faq'
import { faq } from './pages/Faq/Faq.params'
import { FaqId } from './pages/FaqId/FaqId'
import { Index } from './pages/Index/Index'
import { List } from './pages/List/List'
import { OfertaPrivacy } from './pages/OfertaPrivacy/OfertaPrivacy'
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
					await lazyLoader()
					return defer({
						logos: await getDataSlider<logoData>('/logoCount', '/getLogoById'),
						news: await getDataSlider<itemData>('/itemCount', '/getItemById'),
						pop: await getDataSlider<itemData>('/itemCount', '/getItemById'),
					})
				},
			},
			{
				path: '*',
				element: <List />,
				loader: async ({ params, request }) => {
					await lazyLoader()
					sessionStorage.setItem('loader', 'List')
					const { props, page, limit, sort, filterParams } =
						await getSearchParams(params, request)
					const { filter, notFound } = await getFilter(props, filterParams)
					const sliderNotFound = notFound
						? await getDataSlider<itemData>('/itemCount', '/getItemById')
						: null
					return defer({
						items: await getList(props, page, limit, sort, filterParams),
						filter: filter,
						pagination: await getPagination(props, filterParams),
						listSearchParams: { page, limit, sort },
						params: props,
						sliderNotFound: sliderNotFound,
					})
				},
			},
			{
				path: '/brandlist',
				element: <Brandlist />,
				loader: async () => {
					await lazyLoader()
					return defer({
						lang: await getDataBrandlist('lang'),
						table: await getDataBrandlist('table'),
					})
				},
			},
			{
				path: '/faq',
				element: <Faq />,
				loader: async () => {
					await lazyLoader()
					return null
				},
			},
			{
				path: '/faq/:faqId',
				element: <FaqId />,
				loader: async ({ params }) => {
					await lazyLoader()
					const url = faq.map(el => el.to.slice(0, -1))
					const sliderNotFound =
						params.faqId && url.includes(params.faqId)
							? null
							: (await notFound()) &&
								(await getDataSlider<itemData>('/itemCount', '/getItemById'))
					const dataPage =
						params.faqId && url.includes(params.faqId)
							? await getDataPage(params.faqId)
							: null
					return defer({
						sliderNotFound: sliderNotFound,
						dataPage: dataPage,
					})
				},
			},
			{
				path: '/oferta',
				element: <OfertaPrivacy />,
				loader: async ({ request }) => {
					await lazyLoader()
					const pathname = new URL(request.url).pathname.replaceAll('/', '')
					const dataPage = await getDataPage(pathname)
					return defer({
						dataPage: dataPage,
					})
				},
			},
			{
				path: '/privacy',
				element: <OfertaPrivacy />,
				loader: async ({ request }) => {
					await lazyLoader()
					const pathname = new URL(request.url).pathname.replaceAll('/', '')
					const dataPage = await getDataPage(pathname)
					return defer({
						dataPage: dataPage,
					})
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
	</StrictMode>,
)
