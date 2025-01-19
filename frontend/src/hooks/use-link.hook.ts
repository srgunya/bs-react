import { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { listActions } from '../store/list.slice'
import { AppDispatch } from '../store/store'

export function useLink() {
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const navi = useNavigate()
	const dispatch = useDispatch<AppDispatch>()

	function linkTo(e: MouseEvent, to: string) {
		e.preventDefault()
		if (location.pathname == to && !searchParams.size) {
			return false
		} else {
			dispatch(listActions.change({ lazy: true, loading: true }))
			navi(to)
		}
	}
	return linkTo
}
