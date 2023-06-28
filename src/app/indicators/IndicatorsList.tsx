'use client'

import React from 'react'
import Link from 'next/link'
import getMaxIndicatorYear from '../../utils/getMaxIndicatorYear'
import IndicatorsSearch from './IndicatorsSearch'

export default function IndicatorsList({
	mainIdicators,
}: {
	mainIdicators: Indicator[]
}) {
	const [foundIndicators, setFoundIndicators] = React.useState<Indicator[] | null>(
		null,
	)
	const hasFoundIndicators = Boolean(foundIndicators && foundIndicators.length)

	return (
		<>
			<IndicatorsSearch setIndicators={setFoundIndicators} />
			{!hasFoundIndicators && <h3 className="text-2xl mb-3">Main indicators</h3>}
			<nav className="grid grid-cols-3 gap-2">
				{(foundIndicators || mainIdicators).map((indicator) => (
					<Link
						prefetch={false}
						key={indicator.id}
						className="text-blue-500 hover:text-blue-800"
						href={`/indicators/${indicator.id}/${getMaxIndicatorYear()}`}
					>
						{indicator.name}
					</Link>
				))}
			</nav>
		</>
	)
}
