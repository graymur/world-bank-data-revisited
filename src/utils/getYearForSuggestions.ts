import getMaxIndicatorYear from './getMaxIndicatorYear'

export default (year: string) => {
	const currentYear = Number(year)
	const maxYear = getMaxIndicatorYear()

	return [
		currentYear - 3,
		currentYear - 2,
		currentYear - 1,
		currentYear + 1,
		currentYear + 2,
		currentYear + 3,
	]
		.filter((x: number) => x <= maxYear)
		.map((x: number) => String(x))
}
