import { fetchCountry, fetchIndicators } from '../../../utils/dataSource'
import Link from 'next/link'

export default async function Country({ params }: { params: { code: string } }) {
	const country = await fetchCountry(params.code)
	const indicators = await fetchIndicators()

	return (
		<>
			<h1 className="text-4xl mb-3">{country.name}</h1>
			<p className="mb-3">Region: {country.region.value}</p>
			<p className="mb-3">Income level: {country.incomeLevel.value}</p>
			<p className="mb-5">Capital city: {country.capitalCity}</p>
			<h2 className="text-3xl mb-5">Indicators</h2>
			<nav className="grid grid-cols-3 gap-2">
				{(indicators || []).map((indicator) => (
					<Link
						prefetch={false}
						key={indicator.id}
						className="text-blue-500 hover:text-blue-800"
						href={`/countries/${country.iso2Code}/indicator/${indicator.id}`}
					>
						{indicator.name}
					</Link>
				))}
			</nav>
		</>
	)
}
