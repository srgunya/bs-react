import 'normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom'
import { itemData } from './comp/Index__slider_item/IndexSliderItem.props'
import { logoData } from './comp/Index__slider_logo/IndexSliderLogo.props'
import { Layout } from './layout/Layout/Layout'
import { getItems, isTranslit, pagination } from './loaders/getDataList'
import { getDataSlider } from './loaders/getDataSlider'
import './main.scss'
import { Brandlist } from './pages/BrandList/BrandList'
import { Index } from './pages/Index/Index'
import { List } from './pages/List/List'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Index />,
				loader: async () => {
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
			},
			{
				path: '*',
				element: <List />,
				loader: async ({ params, request }) => {
					let props = ['']
					const searchParams = new URL(request.url).searchParams
					const page =
						searchParams.get('page') === null
							? 1
							: Number.isInteger(Number(searchParams.get('page'))) &&
							  Number(searchParams.get('page')) > 0
							? Number(searchParams.get('page'))
							: 1

					return defer({
						params: await new Promise(resolve => {
							setTimeout(() => {
								isTranslit(typeof params['*'] == 'string' ? params['*'] : '').then(data => {
									props = data
									resolve(data)
								})
							}, 300)
						}),
						items: await getItems(props, page),
						pagination: await pagination(props),
						page: page,
					})
				},
			},
		],
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</StrictMode>
)
