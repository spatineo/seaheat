import { expect, test } from "vitest"
import { calculateDifference } from "./calculateDifference"

test('it should return output object with empty series array', () => {
  const temperatureAtDischargeDepth: { values: number[] } | undefined = undefined
  const dischargeWaterTemperature: { values: number[] } | undefined = undefined
  expect(calculateDifference(temperatureAtDischargeDepth, dischargeWaterTemperature)).toEqual({
    unit: 'C',
    axes: { x: { label: 'Month', values: [] } },
    series: []
  })
})
