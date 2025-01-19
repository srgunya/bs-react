import { createContext, ReactNode, useState } from 'react'

export const HeaderContext = createContext<HeaderContext>({
	menuActive: '',
	setMenuActive: () => {},
	basketVisible: false,
	setBasketVisible: () => {},
})

type HeaderContext = {
	menuActive: string
	setMenuActive: React.Dispatch<React.SetStateAction<string>>
	basketVisible: boolean
	setBasketVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export function HeaderContextProvider({ children }: { children: ReactNode }) {
	const [menuActive, setMenuActive] = useState<string>('')
	const [basketVisible, setBasketVisible] = useState(false)

	return (
		<HeaderContext.Provider value={{ menuActive, setMenuActive, basketVisible, setBasketVisible }}>
			{children}
		</HeaderContext.Provider>
	)
}
