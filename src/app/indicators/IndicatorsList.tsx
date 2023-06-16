'use client'

import React from 'react'
import Link from 'next/link'
import getMaxIndicatorYear from '../../utils/getMaxIndicatorYear'
import IndicatorsSearch from './IndicatorsSearch'

export default function IndicatorsList({ mainIdicators }) {
	const [indicators, setIndicators] = React.useState(mainIdicators)
	const [foundIndicators, setFoundIndicators] = React.useState([])
	const hasFoundIndicators = Boolean(foundIndicators.length)

	return (
		<>
			{hasFoundIndicators && <h3 className="indicators__title">Main indicators</h3>}
			<IndicatorsSearch setIndicators={setIndicators} />
			<nav className="grid grid-cols-3 gap-2">
				{indicators.map((indicator) => (
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
