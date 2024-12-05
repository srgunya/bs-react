import { Footer } from '../../comp/Footer/Footer'
import { useLoadPage } from '../../hooks/use-loadPage.hook'

export function Brandlist() {
	const mainRef = useLoadPage()

	return (
		<div className={'main'} ref={mainRef}>
			<div className={'cont'}></div>
			<Footer />
		</div>
	)
}
