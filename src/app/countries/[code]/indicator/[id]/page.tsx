import { fetchIndicator, fetchCountry } from '../../../../../utils/dataSource'
import CountryIndicators from '../../page'
import IndicatorData from './IndicatorData'

export default async function CountryIndicator({ params }) {
	const indicator = await fetchIndicator(params.id)
	const country = await fetchCountry(params.code)

	return (
		<>
			<CountryIndicators params={params} />
			<IndicatorData country={country} indicator={indicator} />
		</>
	)
}
