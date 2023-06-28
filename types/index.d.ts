type AnyObject = {
    [key: string]: any;
}

type Country = {
    id: string
    name: string
    iso2code: string
    iso2Code: string
    capitalCity: string
    region: {
        value: string
        iso2code: string
    }
    incomeLevel: {
        value: string
    }
}

type Indicator = {
    id: string
    name: string
    sourceNote: string
    sourceOrganization: string
}

type IndicatorData = {
    name?: string,
    date?: string,
    value: any
}
