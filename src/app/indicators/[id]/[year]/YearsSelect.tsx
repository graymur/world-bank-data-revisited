'use client'

import React from 'react'
import range from 'lodash/range'
import getMaxIndicatorYear from '../../../../utils/getMaxIndicatorYear'
import { useRouter } from 'next/navigation'

const years = range(1990, getMaxIndicatorYear() + 1).reverse()

export default function YearsSelect({ currentYear, baseUrl }) {
	const router = useRouter()

	const handleYearChange = React.useCallback((e) => {
		router.push(baseUrl + '/' + e.target.value)
	}, [])

	return (
		<select
			id="year"
			className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			onChange={handleYearChange}
			defaultValue={currentYear}
		>
			<option value="" hidden>
				Select year
			</option>
			{years.map((year) => (
				<option key={year} data-year={year}>
					{year}
				</option>
			))}
		</select>
	)
}
