import { TemperatureData } from "../types"
import { toLonLat } from "ol/proj"
import { config } from "../config/app"

import { Value } from "../types/temperature"

const baseUrl = 'https://smartmet-server.out.ock.fmi.fi/edr/collections/seaheat3d.666.10/'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const ticks = [10, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500]

const legend = [
  { minValue: 0, maxValue: 1, color: '#440000' },
  { minValue: 1, maxValue: 2, color: '#660000' },
  { minValue: 2, maxValue: 3, color: '#770000' },
  { minValue: 3, maxValue: 5, color: '#880000' },
  { minValue: 5, maxValue: 8, color: '#990000' },
  { minValue: 8, maxValue: 12, color: '#aa0000' },
  { minValue: 12, maxValue: 16, color: '#cc0000' },
  { minValue: 16, maxValue: 50, color: '#ee0000' }
]

const parameterName = 'monthly_timmax_so'

export const requestTemperatureData = async (location: number[]): Promise<TemperatureData> => {
  const lonLat = toLonLat(location, config.projection)

  const qs = new URLSearchParams()
  qs.append('coords', `POINT(${lonLat.join(' ')})`)
  qs.append('datetime', '2007-01-01T12:00:00Z/2007-12-01T12:00:00Z')

  const tmp = new URLSearchParams(qs)
  const query = `${baseUrl}position?${tmp.toString()}`
  const data = await fetch(query, {})

  const response = await data.json()

  const depthValues = response.coverages[0].domain.axes.z.values
  let seabedDepthIndex = 0

  const temperatureValues: Value[] = []

  response.coverages.forEach((coverage: any) => {
    const x = new Date(coverage.domain.axes.t.values[0] as string).getMonth()
    const values = coverage.ranges[parameterName].values as number[]
    values.forEach((value, y) => {
      if (value !== null && y > seabedDepthIndex) {
        seabedDepthIndex = y
      }
      temperatureValues.push({ x, y, value })
    })
  })

  const seabedDepth = depthValues[seabedDepthIndex]

  return {
    axes: {
      x: { label: 'Month', values: months },
      y: { label: 'Depth', values: depthValues }
    },
    ticks: ticks.filter(t => t < seabedDepth),
    temperatureValues,
    legend,
    seabedDepth
  }
}
