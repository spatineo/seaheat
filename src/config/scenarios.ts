export const edrBaseURL = 'https://ext-seaheat-smartmet-server.out.ock.fmi.fi/edr'

export const scenarios = [{
  id: 'monthly',
  name: 'Reanalysis',
  data: {
    bottomTemperature: '666.1',
    level: '666.10'
  }
}, {
  id: 'rcp45long-rcp45-monthly',
  name: 'RCP 4.5 - pitkän ajan (2069-2099)',
  data: {
    bottomTemperature: '666.1',
    level: '666.2'
  }
}, {
  id: 'rcp45mid-rcp45-monthly',
  name: 'RCP 4.5 - lyhyen ajan (2030-2060)',
  data: {
    bottomTemperature: '666.1',
    level: '666.2'
  }
}, {
  id: 'rcp85long-rcp85-monthly',
  name: 'RCP 8.5 - pitkän ajan (2069-2099)',
  data: {
    bottomTemperature: '666.1',
    level: '666.2'
  }
}, {
  id: 'rcp85mid-rcp85-monthly',
  name: 'RCP 8.5 - lyhyen ajan (2030-2060)',
  data: {
    bottomTemperature: '666.1',
    level: '666.2'
  }
}]

export const functions = [{
  id: 'timmean',
  name: 'Mean'
}, {
  id: 'timmax',
  name: 'Max'
}, {
  id: 'timmin',
  name: 'Min'
}, {
  id: 'timpctl-10',
  name: 'Alin 10%'
}, {
  id: 'timpctl-90',
  name: 'Ylin 90%'
}, {
  id: 'timstd',
  name: 'Keskihajonta'
}]

export const collectionUrl = (scenarioId: string, dataId: string, functionId: string) => {
  return `${edrBaseURL}/collections/seaheat-monthly-${scenarioId}-${functionId}.${dataId}/`
}
