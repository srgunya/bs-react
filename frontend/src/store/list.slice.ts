import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface listState {
	lazy: boolean
	loading: boolean
}

const initialState: listState = {
	lazy: false,
	loading: false,
}

export const listSlice = createSlice({
	name: 'list',
	initialState,
	reducers: {
		change: (state, action: PayloadAction<listState>) => {
			state.lazy = action.payload.lazy
			state.loading = action.payload.loading
		},
	},
})

export default listSlice.reducer
export const listActions = listSlice.actions
