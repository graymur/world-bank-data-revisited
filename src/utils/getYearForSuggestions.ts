import getMaxIndicatorYear from './getMaxIndicatorYear'

export default (year) => {
	const maxYear = getMaxIndicatorYear()
	return [year - 3, year - 2, year - 1, year + 1, year + 2, year + 3].filter(
		(x) => x <= maxYear,
	)
}
