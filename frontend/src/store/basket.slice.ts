import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PREFIX } from '../helpers/API'
import { itemData } from '../interfaces/item.interface'
import { RootState } from './store'

export interface item {
	id: number
	size: string
	count: number
}

interface basketState {
	basket: item[]
	items: itemData[]
}

const initialState: basketState = {
	basket: JSON.parse(localStorage.getItem('basket')!) ?? [],
	items: [],
}

export const getItems = createAsyncThunk<itemData[], void, { state: RootState }>(
	'basket/getItems',
	async (_, thunkApi) => {
		const basket = thunkApi
			.getState()
			.basket.basket.reduce((a: item[], c) => (a.map(e => e.id).includes(c.id) || a.push(c), a), [])
		async function getItem(el: number) {
			const res = await fetch(`${PREFIX}/getItemById/${el}`)
			const data: itemData = await res.json()
			return data
		}
		async function getData() {
			const data = await Promise.all(basket.map(el => getItem(el.id)))
			return data
		}
		const data = await getData()
		return data
	}
)

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<{ id: number; size: string }>) => {
			const order = state.basket.find(el => {
				if (el.id == action.payload.id && el.size == action.payload.size) {
					el.count += 1
					return true
				}
			})
			if (!order) {
				state.basket.push({ ...action.payload, count: 1 })
			}
		},
		remove: (state, action: PayloadAction<{ id: number; size: string }>) => {
			state.basket = state.basket.filter(el => {
				if (el.id == action.payload.id && el.size == action.payload.size) {
					return el.count != 1 && (el.count -= 1)
				} else {
					return el
				}
			})
		},
		clear: state => {
			state.basket = []
		},
	},

	extraReducers: builder => {
		builder.addCase(getItems.fulfilled, (state, action) => {
			state.items = action.payload
		})
	},
})

export const basketActions = basketSlice.actions
