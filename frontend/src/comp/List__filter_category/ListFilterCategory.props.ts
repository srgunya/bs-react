export interface ListFilterCategoryProps {
	category: string[]
	name: string
	paramName: string
	categoryParams: string[]
	startFilter: (name: string, params: string[]) => Promise<void>
}
