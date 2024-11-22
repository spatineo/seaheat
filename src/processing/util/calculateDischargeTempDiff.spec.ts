import { expect, test } from "vitest"
import { calculateDischargeTempDiff } from "./calculateDischargeTempDiff"

test('it should return output object with empty series array', () => {
  const temperatureAtDischargeDepth: { values: number[] } | undefined = undefined
  const dischargeWaterTemperature: { values: number[] } | undefined = undefined
  expect(calculateDischargeTempDiff(temperatureAtDischargeDepth, dischargeWaterTemperature)).toEqual({
    unit: 'C',
    axes: { x: { label: 'Month', values: [] } },
    series: []
  })
})

test("it should return calculated difference from every item from 2 arrays", () => {
  const temperatureAtDischargeDepth: { values: number[] } | undefined = {
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  }

  const dischargeWaterTemperature = {
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }

  expect(calculateDischargeTempDiff(temperatureAtDischargeDepth, dischargeWaterTemperature)).toEqual({
    unit: 'C',
    axes: {
      x: {
        label: 'Month',
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
    series: [
      {
        label: "Temperature",
        values: [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      }
    ]
  })
})
