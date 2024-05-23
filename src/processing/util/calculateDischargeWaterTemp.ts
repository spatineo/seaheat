import { TemperatureData, GraphData } from "../../types"
import { format } from "date-fns"

export function calculateDischargeWaterTemp (intakeTemperature: TemperatureData, temperatureDelta: number[], depth: number | null) {
  const xAxis = { label: 'Month', values: [] as Array<string> }
  const series = { label: "Temperature", values: [] as Array<number> }

  const output: GraphData = {
    unit: 'C',
    axes: { x: { label: 'Month', values: [] } },
    series: []
  }

  const findEqualDepthIndex = intakeTemperature.axes.y.values.findIndex(val => depth !== null && val >= depth)

  const searchForValues = findEqualDepthIndex > -1 ? intakeTemperature.temperatureValues.filter((tmp) => tmp.y === findEqualDepthIndex && tmp) : null
  if (searchForValues !== null && temperatureDelta.length > 0) {
    console.log('temperatureDelta', temperatureDelta, searchForValues)
    Array(12).fill(0).forEach((_v, month: number) => {
      const d = new Date(2001, month, 1)
      const calculatedValues = searchForValues?.find((v) => v.x === month)?.value
      series.values[month] = Number(calculatedValues) - temperatureDelta[month]
      xAxis.values[month] = format(d, 'LLL')
    })
    output.axes = { x: xAxis }
    output.series = [series]
  }
  return output
}
