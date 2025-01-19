import { configureStore } from '@reduxjs/toolkit'
import { basketSlice } from './basket.slice'
import { listSlice } from './list.slice'

export const store = configureStore({
	reducer: {
		list: listSlice.reducer,
		basket: basketSlice.reducer,
	},
})

store.subscribe(() => {
	localStorage.setItem('basket', JSON.stringify(store.getState().basket.basket))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
