import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
export function useLoadPage() {
	const mainRef = useRef<HTMLDivElement>(null)
	const location = useLocation()

	useLayoutEffect(() => {
		mainRef.current?.classList.remove('lazy__img')
	}, [location])

	useEffect(() => {
		setTimeout(() => {
			mainRef.current?.classList.add('lazy__img')
		}, 100)
	}, [location])
	return mainRef
}
