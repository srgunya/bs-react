export function translitToRus(word: string) {
	const converter = {
		obuv: 'обувь',
		bele: 'белье',
		ashi: 'ащи',
		yo: 'ё',
		zh: 'ж',
		ch: 'ч',
		sh: 'ш',
		yu: 'ю',
		ya: 'я',
		a: 'а',
		b: 'б',
		v: 'в',
		g: 'г',
		d: 'д',
		e: 'е',
		z: 'з',
		i: 'и',
		j: 'й',
		k: 'к',
		l: 'л',
		m: 'м',
		n: 'н',
		o: 'о',
		p: 'п',
		r: 'р',
		s: 'с',
		t: 'т',
		u: 'у',
		f: 'ф',
		h: 'х',
		c: 'ц',
		y: 'ы',
	}
	for (const [key, value] of Object.entries(converter)) {
		word = word.replaceAll(key, value)
	}
	return word
}
