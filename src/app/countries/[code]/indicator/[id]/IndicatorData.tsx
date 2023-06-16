'use client'

import React from 'react'
import Link from 'next/link'
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts'
import { fetchIndicatorByCountryData } from '../../../../../utils/dataSource'
import Loader from '../../../../../components/Loader'

export default function IndicatorData({ country, indicator }) {
	const [loading, setLoading] = React.useState(true)
	const [data, setData] = React.useState(null)

	React.useEffect(() => {
		fetchIndicatorByCountryData(country.iso2Code, indicator.id).then((data) => {
			setLoading(false)
			setData(data)
		})
	}, [])

	let content = null

	if (loading) {
		content = <Loader />
	} else if (!data.length) {
		content = <h1>No data for this country</h1>
	} else {
		const nonEmptyValues = (data || []).filter((x) => x.value)

		content = (
			<>
				<div className="indicator-chart__info">
					<h3 className="text-2xl mb-3">{indicator.name}</h3>
					<p className="mb-3">{indicator.sourceNote}</p>
					{indicator.sourceOrganization && (
						<p className="mb-3">Source: {indicator.sourceOrganization}</p>
					)}
				</div>
				{!nonEmptyValues.length && <h1>No data for this country</h1>}
				{Boolean(nonEmptyValues.length) && (
					<ResponsiveContainer>
						<LineChart height={300} data={nonEmptyValues.reverse()}>
							<Line type="monotone" dataKey="value" stroke="#8884d8" />
							<CartesianGrid stroke="#ccc" />
							<XAxis dataKey="date" />
							<YAxis />
						</LineChart>
					</ResponsiveContainer>
				)}
			</>
		)
	}

	return (
		<div className="mt-12">
			<div
				className="relative z-10"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
							<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<div className="mb-4">
									<Link
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
										href={`/countries/${country.iso2Code}`}
									>
										Close
									</Link>
								</div>
								<div>{content}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
