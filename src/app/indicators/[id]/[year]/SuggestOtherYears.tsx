'use client'

import React from 'react'
import Link from 'next/link'
import { fetchIndicatorDataByYear } from '../../../../utils/dataSource'
import getYearForSuggestions from '../../../../utils/getYearForSuggestions'

export default function SuggestData({ indicator, currentYear }) {
	const years = getYearForSuggestions(currentYear)
	const [_, setRandomValueToForceRerender] = React.useState(null)
	const suggestions = React.useRef()

	if (!years.length) {
		return null
	}

	React.useEffect(() => {
		years.forEach((year) => {
			fetchIndicatorDataByYear(indicator.id, year).then((result) => {
				suggestions.current = {
					...suggestions.current,
					[year]: result,
				}

				setRandomValueToForceRerender(Math.random())
			})
		})
	}, [])

	const yearsWithData = Object.keys(suggestions.current || {}).sort()

	if (!yearsWithData.length) {
		return null
	}

	return (
		<div>
			Try these years instead:
			{yearsWithData.map((year) => (
				<Link
					href={`/indicators/${indicator.id}/${year}#chart`}
					key={year}
					className="text-blue-500 hover:text-blue-800 ml-2"
				>
					{year}
				</Link>
			))}
		</div>
	)
}
