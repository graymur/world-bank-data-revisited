'use client'

import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { fetchIndicatorsFromWB } from '../../utils/dataSource'
import { Loader } from '../../components/Loader'

let searchTimeout: any

export default function IndicatorsSearch({
	setIndicators,
}: {
	setIndicators: (indicators: Indicator[] | null) => void
}) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const searchStringFromGetParam = searchParams.get('search') || ''

	const [searchString, setSearchString] = React.useState('')

	const [searching, setSearching] = React.useState(false)

	const hadleSearchInputChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchString(e.target.value)
		},
		[],
	)

	const hadleSearchButtonClick = React.useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault()
			searchIndicators(searchString)
		},
		[searchString],
	)

	const searchIndicators = (searchString: string) => {
		if (searchString) {
			setSearching(true)

			if (searchStringFromGetParam !== searchString) {
				router.push(pathname + '?search=' + searchString)
			}

			fetchIndicatorsFromWB().then((indicators: Indicator[]) => {
				const found = indicators.filter((x: Indicator) =>
					x.name.toLowerCase().includes(searchString.toLowerCase()),
				)

				setIndicators(found)
				setSearching(false)
			})
		} else {
			router.push(pathname)
			setIndicators(null)
		}
	}

	React.useEffect(() => {
		if (searchStringFromGetParam && searchStringFromGetParam !== searchString) {
			setSearchString(searchStringFromGetParam)
			searchIndicators(searchStringFromGetParam)
		}
	}, [searchStringFromGetParam])

	return (
		<div className="mb-5">
			<form>
				<label
					htmlFor="search"
					className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
				>
					Search
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						type="search"
						id="search"
						className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Search"
						required
						value={searchString}
						onChange={hadleSearchInputChange}
					/>
					<div className="relative">
						{searching && (
							<div className="absolute" style={{ top: '-43px', right: '90px' }}>
								<Loader />
							</div>
						)}
						<button
							type="submit"
							className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							onClick={hadleSearchButtonClick}
							disabled={searchString.length < 3}
						>
							Search
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
