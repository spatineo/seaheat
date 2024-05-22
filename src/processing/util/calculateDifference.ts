import { format } from "date-fns"
import { GraphData } from "../../types"

interface TemperatureData {
  values: number[]
}

export function calculateDifference (arr1: TemperatureData | undefined, arr2: TemperatureData | undefined) {
  const xAxis = { label: 'Month', values: [] as Array<string> }
  const series = { label: "Temperature", values: [] as Array<number> }

  const output: GraphData = {
    unit: 'C',
    axes: { x: { label: 'Month', values: [] } },
    series: []
  }

  if (arr1 !== undefined && arr2 !== undefined) {
    Array(12).fill(0).forEach((_item, month: number) => {
      const d = new Date(2001, month, 1)
      xAxis.values[month] = format(d, 'LLL')
      series.values[month] = arr2.values[month] - arr1.values[month]
    })
    output.axes = { x: xAxis }
    output.series = [series]
  }
  return output
}
