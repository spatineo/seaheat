import { TemperatureData } from "../types"
import { toLonLat } from "ol/proj"
import { config } from "../config/app"

import { Value } from "../types/temperature"
import { collectionUrl } from "../config/scenarios"

const baseUrl = collectionUrl('monthly', 'level', 'timmean')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const ticks = [10, 25, 50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500]

const legend = [
  { minValue: null, maxValue: -1, color: '#505b96' },
  { minValue: -1, maxValue: 0, color: '#94a2c2' },
  { minValue: 0, maxValue: 1, color: '#e1f2f1' },
  { minValue: 1, maxValue: 2, color: '#5aa991' },
  { minValue: 2, maxValue: 3, color: '#6daa4e' },
  { minValue: 3, maxValue: 4, color: '#c1e058' },
  { minValue: 4, maxValue: 5, color: '#f1fb5b' },
  { minValue: 5, maxValue: 6, color: '#e8d949' },
  { minValue: 6, maxValue: 8, color: '#f4bc35' },
  { minValue: 8, maxValue: 10, color: '#f59620' },
  { minValue: 10, maxValue: 12, color: '#f66d09' },
  { minValue: 12, maxValue: 14, color: '#f24706' },
  { minValue: 14, maxValue: 16, color: '#ce060b' },
  { minValue: 16, maxValue: 18, color: '#b60322' },
  { minValue: 18, maxValue: 20, color: '#93003a' },
  { minValue: 20, maxValue: 25, color: '#af025b' },
  { minValue: 25, maxValue: 30, color: '#d50771' },
  { minValue: 30, maxValue: 35, color: '#b11141' },
  { minValue: 35, maxValue: null, color: '#960a2c' }
]

// const parameterNameSaltiness = 'monthly_timmax_so' // Salt
const parameterNameTemp = 'monthly_thetao' // Temperature

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
    const values = coverage.ranges[parameterNameTemp].values as number[]
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
