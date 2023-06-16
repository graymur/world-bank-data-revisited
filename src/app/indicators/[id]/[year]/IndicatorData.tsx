'use client'

import React from 'react'
import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
} from 'recharts'
import { fetchIndicatorDataByYear } from '../../../../utils/dataSource'
import Loader from '../../../../components/Loader'
import SuggestOtherYears from './SuggestOtherYears'

export default function IndicatorData({ indicator, year }) {
	const [loading, setLoading] = React.useState(true)
	const [data, setData] = React.useState(null)

	React.useEffect(() => {
		fetchIndicatorDataByYear(indicator.id, year).then((data) => {
			setLoading(false)
			setData(data)
		})
	}, [])

	if (loading) {
		return <Loader />
	}

	if (!data.length) {
		return (
			<div className="mt-5 text-center">
				<h4 className="text-2xl mb-3">No data for this year</h4>
				<SuggestOtherYears indicator={indicator} currentYear={year} />
			</div>
		)
	}

	const formattedData = data.map((x) => ({ ...x, value: round(x.value) }))

	const height = data.length * 3 + 5

	return (
		<div className="mt-12" style={{ height: `${height}rem` }}>
			<ResponsiveContainer>
				<BarChart layout="vertical" data={formattedData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" dataKey="value" />
					<YAxis type="category" dataKey="name" width={150} />
					<Tooltip />
					<Bar dataKey="value" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

function round(num, decimalPlaces = 2) {
	return +(Math.round(num + `e+${decimalPlaces}`) + `e-${decimalPlaces}`)
}
