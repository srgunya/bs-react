export interface filterData {
	brand: {
		buckets: { key: string }[]
	}
	category: {
		buckets: { key: string }[]
	}
	color: {
		buckets: { key: string }[]
	}
	discount_price: {
		buckets: { key: string }[]
	}
	sex: {
		buckets: { key: string }[]
	}
	size: {
		buckets: { key: string }[]
	}
}

export interface filterParamsType {
	pol: string[]
	kategoriya: string[]
	tsvet: string[]
	razmer: string[]
	brand: string[]
}
