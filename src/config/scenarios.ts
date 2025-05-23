export const edrBaseURL = 'https://ext-seaheat-smartmet-server.out.ock.fmi.fi/edr'

interface Scenario {
  id: string
  name: string
  data: {
    [x: string]: string
  }
  dataYear: number
}

export const scenarios = [{
  id: 'monthly',
  name: 'Reanalysis',
  data: {
    bottomTemperature: '666.1',
    level: '666.10'
  },
  dataYear: 2007
}, {
  id: 'rcp45long-rcp45-monthly',
  name: 'RCP 4.5 - long term (2069-2099)',
  data: {
    bottomTemperature: '666.1',
    level: '666.2'
  },
  dataYear: 2084
}, {
  id: 'rcp45mid-rcp45-monthly',
  name: 'RCP 4.5 - short term (2030-2060)',
  data: {
    bottomTemperature: '666.1',
    level: '666.2'
  },
  dataYear: 2045
}, {
  id: 'rcp85long-rcp85-monthly',
  name: 'RCP 8.5 - long term (2069-2099)',
  data: {
    bottomTemperature: '666.1',
    level: '666.2'
  },
  dataYear: 2084
}, {
  id: 'rcp85mid-rcp85-monthly',
  name: 'RCP 8.5 - short term (2030-2060)',
  data: {
    bottomTemperature: '666.1',
    level: '666.2'
  },
  dataYear: 2045
}] as Scenario[]

export const functions = [{
  id: 'timmean',
  name: 'Average'
}, {
  id: 'timpctl-90',
  name: '90th percentile'
}, {
  id: 'timpctl-10',
  name: '10th percentile'
}, {
  id: 'timmax',
  name: 'Max'
}, {
  id: 'timmin',
  name: 'Min'
}, {
  id: 'timstd',
  name: 'Standard deviation'
}]

export const collectionTemperatureUrl = (scenarioId: string, dataType: string, functionId: string) => {
  const dataId = scenarios.find(s => s.id === scenarioId)?.data[dataType]
  return `${edrBaseURL}/collections/seaheat-monthly-${scenarioId}-${functionId}.${dataId}/`
}

export const collectionImpactUrl = (volume: number) => {
  // Cap volume to 10-80 by not accepting values above 80 and treating values < 10 as 10
  if (volume > 80) throw Error(`volume ${volume} outside of range (max 80)`)
  const normalizedVolume = volume < 10 ? 10 : volume

  const roundedVolume = Math.round(normalizedVolume / 5) * 5
  const volumeCollectionId = String(roundedVolume).padStart(2, '0')
  return `${edrBaseURL}/collections/seaheat-monthly-intial-r-and-z-v-${volumeCollectionId}-2000-2019.667.2/`
}
