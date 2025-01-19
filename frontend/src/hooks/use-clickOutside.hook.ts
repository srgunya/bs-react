import { RefObject, useEffect } from 'react'

export const useClickOutside = (
	ref: RefObject<HTMLElement | undefined>,
	className: string,
	callback: () => void
) => {
	const handleClick = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
			if (event.target instanceof Element && event.target.classList.contains(className)) {
				return false
			}
			callback()
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClick)

		return () => {
			document.removeEventListener('click', handleClick)
		}
	})
}
