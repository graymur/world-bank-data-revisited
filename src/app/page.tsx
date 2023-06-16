import Link from 'next/link'

export default function Home() {
	return (
		<>
			<h1 className="text-4xl mb-3">Statistics and graphs</h1>
			<h4 className="text-2xl mb-3">
				Based on data provided by{' '}
				<a href="https://worldbank.org/" target="_blank">
					World Bank.
				</a>
			</h4>
			<p className="mb-3">
				World Bank collects a lot of data for different countries, represented by
				"Indicators". Indicators represent data like total population, gross national
				income, energy use, and many more. There are 16 912 indicators currently.
				This site shows data by some of them. You can view data for particular
				indicator, which shows data for all countries, or by country, giving you the
				dynamics of some indicator for given country over the years.
			</p>
			<p className="mb-3">Try it out:</p>
			<ul>
				<li className="mb-1">
					<Link
						prefetch={false}
						href="/indicators/NY.GDP.PCAP.CD/2016"
						className="text-blue-500 hover:text-blue-800"
					>
						Countries ranked by GDP per capita, year 2016
					</Link>
				</li>
				<li className="mb-1">
					<Link
						prefetch={false}
						href="/indicators/SM.POP.REFG.OR/2014"
						className="text-blue-500 hover:text-blue-800"
					>
						Countries ranked by number of refugees, year 2014
					</Link>
				</li>
				<li className="mb-1">
					<Link
						prefetch={false}
						href="/indicators/SP.POP.TOTL/2015"
						className="text-blue-500 hover:text-blue-800"
					>
						Countries ranked by population, year 2015 (guess who's number one)
					</Link>
				</li>
				<li className="mb-1">
					<Link
						prefetch={false}
						href="/indicators/SH.STA.SUIC.P5/2015"
						className="text-blue-500 hover:text-blue-800"
					>
						Countries ranked by suicide mortality rate, year 2015
					</Link>
				</li>
				<li className="mb-1">
					<Link
						prefetch={false}
						href="/countries/US/indicator/FP.CPI.TOTL.ZG"
						className="text-blue-500 hover:text-blue-800"
					>
						Inflation of consumer prices in US over the years
					</Link>
				</li>
				<li className="mb-1">
					<Link
						prefetch={false}
						href="/countries/CA/indicator/SP.POP.TOTL.FE.IN"
						className="text-blue-500 hover:text-blue-800"
					>
						Dynamics of female population in Canada
					</Link>
				</li>
				<li>
					<Link
						prefetch={false}
						href="/countries/OM/indicator/GB.XPD.DEFN.GDP.ZS"
						className="text-blue-500 hover:text-blue-800"
					>
						Defence spendings in Oman, years 1970-1995
					</Link>
				</li>
			</ul>
		</>
	)
}
