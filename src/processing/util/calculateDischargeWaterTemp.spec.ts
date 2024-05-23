import { expect, test } from "vitest"
import { calculateDischargeWaterTemp } from "./calculateDischargeWaterTemp"
import { TemperatureData } from "../../types"
import { axes, temperatureValues } from './dischargeWaterTempData'

test("It should return output object with empty series array", () => {
  const intakeTemperature: TemperatureData = {
    axes: {
      x: { label: 'N/A', values: [] },
      y: { label: 'N/A', values: [] }
    },
    ticks: [],
    temperatureValues: [],
    legend: [],
    seabedDepth: 0
  }
  const temperatureDelta: number[] = []
  const depth: number | null = null
  expect(calculateDischargeWaterTemp(intakeTemperature, temperatureDelta, depth)).toEqual({
    unit: 'C',
    axes: { x: { label: 'Month', values: [] } },
    series: []
  })
})

test("It should return output object where series array is filled", () => {
  const intakeTemperature: TemperatureData = {
    axes,
    ticks: [],
    temperatureValues,
    legend: [],
    seabedDepth: 0
  }
  const temperatureDelta: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  const depth: number | null = 300
  expect(calculateDischargeWaterTemp(intakeTemperature, temperatureDelta, depth)).toEqual({
    unit: "C",
    axes: {
      x: {
        label: "Month",
        values: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ]
      }
    },
    series: [{
      label: "Temperature",
      values: [
        15.3418,
        17.44,
        17.173,
        15.807500000000001,
        15.3387,
        14.8781,
        17.3688,
        19.2037,
        12.9175,
        10.44,
        9.1394,
        8.9037
      ]
    }]
  })
})
