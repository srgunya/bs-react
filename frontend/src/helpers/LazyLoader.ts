export async function lazyLoader() {
	await new Promise(resolve => {
		setTimeout(() => {
			resolve(null)
		}, 300)
	})
}
