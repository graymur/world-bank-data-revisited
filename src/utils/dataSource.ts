import _ from 'lodash'
import aggregatedRegionsISOCodes from './data/aggregatedRegionsISOCodes.json'

const urlBase = 'https://api.worldbank.org/v2'

type Country = {
	id: string
	name: string
	iso2code: string
	iso2Code: string
	capitalCity: string
	region: {
		value: string
		iso2code: string
	}
	incomeLevel: {
		value: string
	}
}

type Indicator = {
	id: string
	name: string
	sourceNote: string
	sourceOrganization: string
}

async function fetchJson(url: string) {
	const response = await fetch(url)
	return response.json()
}

export async function fetchCountries(limit = 1000): Promise<[Country]> {
	const result = await fetchJson(
		`${urlBase}/countries?per_page=${limit}&format=json`,
	)

	return result[1]
		.filter((x: Country) => x.region.iso2code !== 'NA')
		.sort((a: Country, b: Country) => (a.name > b.name ? 1 : -1))
}

export async function fetchCountry(id: string): Promise<Country> {
	const result = await fetchJson(`${urlBase}/countries/${id}?format=json`)

	try {
		return result[1][0]
	} catch (e) {
		throw new Error('Country not found')
	}
}

export async function fetchIndicators(): Promise<[Indicator]> {
	return require('./data/mainIndicators.json')
		.map((x: Indicator) => _.pick(x, ['id', 'name']))
		.sort((a: Indicator, b: Indicator) => (a.name > b.name ? 1 : -1))
}

export async function fetchIndicator(id: string): Promise<Indicator> {
	const result = await fetchJson(`${urlBase}/indicators/${id}?format=json`)

	/**
	 * World bank's API wont' return anything for an indicator it returns in indicators list request
	 * (example: "per_lm_pa_p1_rur") - show appropriate error message
	 */
	try {
		return result[1][0] as Indicator
	} catch (e) {
		throw new Error('There is something wrong with this indicator')
	}
}

export async function fetchIndicatorByCountryData(
	iso2Code: string,
	indicatorId: string,
) {
	const result = await fetchJson(
		`${urlBase}/countries/${iso2Code}/indicators/${indicatorId}?format=json`,
	)
	return (result[1] || []).map((x) => ({ date: x.date, value: x.value }))
}

export async function fetchIndicatorDataByYear(indicatorId, year) {
	const result = await fetchJson(
		`${urlBase}/countries/all/indicators/${indicatorId}?date=${year}:${year}&per_page=1000&format=json`,
	)

	return (result[1] || [])
		.filter(
			(x) => !aggregatedRegionsISOCodes.includes(x.country.id) && x.value !== null,
		)
		.sort((a, b) => (a.country.value > b.country.value ? -1 : 1))
		.sort((a, b) => (a.value > b.value ? -1 : 1))
		.map((x) => ({ name: x.country.value, value: x.value }))
}

// export const searchIndicators = async (pattern) => {
// 	const result = await IndicatorModel.find({ $text: { $search: pattern } })
//
// 	return result.map((x) => x.data).sort((a, b) => (a.name > b.name ? 1 : -1))
// }

export async function fetchIndicatorsFromWB(limit) {
	const result = await fetchJson(
		`${urlBase}/indicators?per_page=${limit}&format=json`,
	)

	return result[1]
}
