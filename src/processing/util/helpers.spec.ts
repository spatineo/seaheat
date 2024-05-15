import { expect, test } from "vitest"
import { parseDimensionValues, convertDimensionStringValue } from "./helpers"

test('split with commas', () => {
  const dimensionValues = "2005-01-01T12:00:00Z/2005-12-31T12:00:00Z/PT24"
  expect(convertDimensionStringValue(dimensionValues)).toEqual({ seperator: true, value: ["2005-01-01T12:00:00Z/2005-12-31T12:00:00Z/PT24"] })
})

test('return object sepertor and value if no slash with numbers', () => {
  const dimensionValues = "200,300,400,500,600,700,800,850"
  expect(convertDimensionStringValue(dimensionValues)).toEqual({ seperator: false, value: ["200", "300", "400", "500", "600", "700", "800", "850"] })
})

test('return object sepertor and value if no slash with numbers', () => {
  const dimensionValues = "200, 300, 400"
  expect(convertDimensionStringValue(dimensionValues)).toEqual({ seperator: false, value: ["200", "300", "400"] })
})

test('should return array with texts as items', () => {
  const dimensionValues = "first, second, third"
  expect(parseDimensionValues(dimensionValues)).toEqual(["first", "second", "third"])
})

test('should return array with numbers items', () => {
  const dimensionValues = "200, 300, 400, 500,600, 700,800,850"
  expect(parseDimensionValues(dimensionValues)).toEqual(["200", "300", "400", "500", "600", "700", "800", "850"])
})

test('return hourly when duration is PT1H', () => {
  const dimensionValues = "2023-05-11T09:00:00Z/2023-05-12T03:00:00Z/PT1H,2023-05-11T09:00:00Z/2023-05-15T03:00:00Z/PT1H,2023-05-11T09:00:00Z/2023-05-15T03:00:00Z/PT1H"
  expect(parseDimensionValues(dimensionValues)).toEqual([
    "2023-05-11T09:00:00.000Z",
    "2023-05-11T10:00:00.000Z",
    "2023-05-11T11:00:00.000Z",
    "2023-05-11T12:00:00.000Z",
    "2023-05-11T13:00:00.000Z",
    "2023-05-11T14:00:00.000Z",
    "2023-05-11T15:00:00.000Z",
    "2023-05-11T16:00:00.000Z",
    "2023-05-11T17:00:00.000Z",
    "2023-05-11T18:00:00.000Z",
    "2023-05-11T19:00:00.000Z",
    "2023-05-11T20:00:00.000Z",
    "2023-05-11T21:00:00.000Z",
    "2023-05-11T22:00:00.000Z",
    "2023-05-11T23:00:00.000Z",
    "2023-05-12T00:00:00.000Z",
    "2023-05-12T01:00:00.000Z",
    "2023-05-12T02:00:00.000Z",
    "2023-05-12T03:00:00.000Z"])
})

test('return daily when duration is PT24H', () => {
  const dimensionValues = "2024-05-11T09:00:00Z/2024-05-15T03:00:00Z/PT24H"
  expect(parseDimensionValues(dimensionValues)).toEqual(['2024-05-11T09:00:00.000Z', '2024-05-12T09:00:00.000Z', '2024-05-13T09:00:00.000Z', '2024-05-14T09:00:00.000Z'])
})
