import { createContext, ReactNode, useState } from 'react'

export const ListContext = createContext<ListContext>({
	listState: { lazy: false, loading: false },
	setListState: () => {},
})

type ListContext = {
	listState: {
		lazy: boolean
		loading: boolean
	}
	setListState: React.Dispatch<
		React.SetStateAction<{
			lazy: boolean
			loading: boolean
		}>
	>
}

export function ListContextProvider({ children }: { children: ReactNode }) {
	const [listState, setListState] = useState({ lazy: false, loading: false })

	return <ListContext.Provider value={{ listState, setListState }}>{children}</ListContext.Provider>
}
