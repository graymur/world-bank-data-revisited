export default function Menu() {
	return (
		<ul className="flex mb-5">
			<li className="mr-6">
				<a className="text-blue-500 hover:text-blue-800" href="/">
					Main page
				</a>
			</li>
			<li className="mr-6">
				<a className="text-blue-500 hover:text-blue-800" href="/countries">
					Countries
				</a>
			</li>
			<li className="mr-6">
				<a className="text-blue-500 hover:text-blue-800" href="/indicators">
					Indicators
				</a>
			</li>
		</ul>
	)
}
