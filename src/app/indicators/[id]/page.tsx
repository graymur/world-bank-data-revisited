import IndicatorYear from './[year]/page'

type IndicatorDefaultProps = {
	params: { id: string }
}

export default function Indicator({ params }: IndicatorDefaultProps) {
	return <IndicatorYear params={{ ...params, year: '2023' }} />
}
