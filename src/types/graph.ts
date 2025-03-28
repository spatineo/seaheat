interface Axis <T> {
  label: string
  values: T[]
}

export interface Series {
  label: string
  values: Array<number>
}

export interface GraphData {
  unit: string
  axes: {
    x: Axis<string>
  }
  series: Array<Series>
  scenarioId: string | null
  functionId: string | null
}

export const emptyGraphData = (): GraphData => ({
  unit: 'N/A',
  axes: {
    x: { label: 'N/A', values: [] }
  },
  series: [],
  scenarioId: null,
  functionId: null
})
