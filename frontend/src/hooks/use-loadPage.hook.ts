import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
export function useLoadPage() {
	const mainRef = useRef<HTMLDivElement>(null)
	const location = useLocation()

	useLayoutEffect(() => {
		mainRef.current?.classList.remove('lazy__img')
	}, [location.pathname])

	useEffect(() => {
		setTimeout(() => {
			mainRef.current?.classList.add('lazy__img')
		}, 300)
	}, [location.pathname])

	return mainRef
}
