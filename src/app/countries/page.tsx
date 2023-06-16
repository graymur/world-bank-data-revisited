import { fetchCountries } from '../../utils/dataSource'
import Link from 'next/link'

export default async function Conutries() {
	const countries = await fetchCountries()

	return (
		<>
			<h1 className="text-4xl mb-5">Countries list</h1>
			<nav className="grid grid-cols-3 gap-2">
				{countries.map((country) => (
					<Link
						prefetch={false}
						key={country.iso2Code}
						className="text-blue-500 hover:text-blue-800"
						href={`/countries/${country.iso2Code}`}
					>
						{country.name}
					</Link>
				))}
			</nav>
		</>
	)
}
