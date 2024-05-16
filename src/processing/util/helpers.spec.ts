import { expect, test } from "vitest"
import { parseDimensionValues, convertDimensionStringValue } from "./helpers"

test('it should return number items', () => {
  const dimensionValues = "200,300,400"
  expect(parseDimensionValues(dimensionValues)).toEqual(["200", "300", "400"])
})

test('it should return number items', () => {
  const dimensionValues = "first, second, third"
  expect(parseDimensionValues(dimensionValues)).toEqual(["first", "second", "third"])
})

test('it should split with slash', () => {
  const dimensionValues = "2005-01-01T12:00:00Z/2005-12-31T12:00:00Z/PT24"
  expect(convertDimensionStringValue(dimensionValues)).toEqual(["2005-01-01T12:00:00Z", "2005-12-31T12:00:00Z", "PT24"])
})

test('should return array with numbers items removing spaces', () => {
  const dimensionValues = "200, 300, 400, 500,600, 700,800,850"
  expect(parseDimensionValues(dimensionValues)).toEqual(["200", "300", "400", "500", "600", "700", "800", "850"])
})

test('return hourly when duration is PT1H', () => {
  const dimensionValues = "2023-05-11T02:00:00Z,2023-05-11T09:00:00Z/2023-05-11T12:00:00Z/PT1H"
  expect(parseDimensionValues(dimensionValues)).toEqual([
    '2023-05-11T02:00:00Z',
    '2023-05-11T09:00:00.000Z',
    '2023-05-11T10:00:00.000Z',
    '2023-05-11T11:00:00.000Z',
    '2023-05-11T12:00:00.000Z'
  ])
})

test('return daily when duration is PT24H', () => {
  const dimensionValues = "2023-05-11T00:00:00Z,2023-05-12T00:00:00Z/2023-05-13T00:00:00Z/PT24H"
  expect(parseDimensionValues(dimensionValues)).toEqual([
    '2023-05-11T00:00:00Z',
    '2023-05-12T00:00:00.000Z',
    '2023-05-13T00:00:00.000Z'
  ])
})

test('return daily when duration is PT1H30M', () => {
  const dimensionValues = "2023-05-11T00:00:00Z,2023-05-12T00:00:00Z/2023-05-12T03:00:00Z/PT1H30M"
  expect(parseDimensionValues(dimensionValues)).toEqual([
    '2023-05-11T00:00:00Z',
    '2023-05-12T00:00:00.000Z',
    '2023-05-12T01:30:00.000Z',
    '2023-05-12T03:00:00.000Z'
  ])
})

test('one month period', () => {
  const dimensionValues = "2023-01-01T00:00:00Z/2023-03-01T00:00:00Z/P1M"
  expect(parseDimensionValues(dimensionValues)).toEqual([
    '2023-01-01T00:00:00.000Z',
    '2023-02-01T00:00:00.000Z',
    '2023-03-01T00:00:00.000Z'
  ])
})
