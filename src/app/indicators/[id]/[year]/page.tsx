import { fetchIndicator } from '../../../../utils/dataSource'
import YearsSelect from './YearsSelect.tsx'
import IndicatorData from './IndicatorData.tsx'

type IndicatorProps = {
	params: { id: string; year: string }
}

export default async function IndicatorYear({ params }: IndicatorProps) {
	const year = params.year
	const indicator = await fetchIndicator(params.id)

	return (
		<>
			<h1 className="text-4xl mb-3">{indicator.name}</h1>
			<p className="mb-3">
				{indicator.sourceNote !== 'NULL' && indicator.sourceNote}
			</p>
			{indicator.sourceOrganization && (
				<p className="mb-3">Source: {indicator.sourceOrganization}</p>
			)}
			<div className="indicator__years">
				<YearsSelect currentYear={year} baseUrl={`/indicators/${params.id}`} />
				<IndicatorData indicator={indicator} year={year} />
			</div>
		</>
	)
}
