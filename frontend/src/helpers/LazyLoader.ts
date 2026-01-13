export async function LazyLoader() {
	await new Promise(resolve => {
		setTimeout(() => {
			resolve(null)
		}, 300)
	})
}
