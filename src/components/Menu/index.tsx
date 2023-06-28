import Link from 'next/link'

export default function Menu() {
	return (
		<ul className="flex mb-5">
			<li className="mr-6">
				<Link
					prefetch={false}
					className="text-blue-500 hover:text-blue-800"
					href="/"
				>
					Main page
				</Link>
			</li>
			<li className="mr-6">
				<Link
					prefetch={false}
					className="text-blue-500 hover:text-blue-800"
					href="/countries"
				>
					Countries
				</Link>
			</li>
			<li className="mr-6">
				<Link
					prefetch={false}
					className="text-blue-500 hover:text-blue-800"
					href="/indicators"
				>
					Indicators
				</Link>
			</li>
		</ul>
	)
}
