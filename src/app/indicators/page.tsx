import { fetchIndicators } from '../../utils/dataSource'
import IndicatorsList from './IndicatorsList'
import Link from 'next/link'

export default async function Indicators() {
	const indicators = await fetchIndicators()

	return (
		<>
			<h1 className="text-4xl mb-3">Indicators List</h1>
			<p className="mb-4">
				World Bank collects data on more then 16 thousands indicators. Here are some
				of the major ones. You can find others using serch field. For example: "
				<Link prefetch={false} href="/indicators?search=spendings">
					spendings
				</Link>
				".
			</p>
			<IndicatorsList mainIdicators={indicators} />
		</>
	)
}
