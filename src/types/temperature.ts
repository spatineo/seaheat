interface Axis <T> {
  label: string
  values: T[]
}

export interface Value {
  x: number
  y: number
  value: number
}

interface Legend {
  minValue: number | null
  maxValue: number | null
  color: string
}

export interface TemperatureData {
  axes: {
    x: Axis<string>
    y: Axis<number>
  }
  ticks: number[]
  temperatureValues: Value[]
  legend: Legend[]
  seabedDepth: number
}

export interface TemperatureProps {
  data: TemperatureData
  height: number
  marker?: number
}

export const emptyTemperatureData = (): TemperatureData => ({
  axes: {
    x: { label: 'N/A', values: [] },
    y: { label: 'N/A', values: [] }
  },
  ticks: [],
  temperatureValues: [],
  legend: [],
  seabedDepth: 0
})
