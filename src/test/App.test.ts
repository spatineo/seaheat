import { expect, test } from "vitest"
import { parseDimensionValues, convertDimensionStringValue } from "../processing/util/helpers"

test('convert dimension value seperated with slash', () => {
  const dimensionValues = "2005-01-01T12:00:00Z/2005-12-31T12:00:00Z/PT24"
  expect(convertDimensionStringValue(dimensionValues)).toEqual(["2005-01-01T12:00:00Z", "2005-12-31T12:00:00Z", "PT24"])
})

test('convert dimension value seperated with comma ', () => {
  const dimensionValues = "200,300,400,500,600,700,800,850"
  expect(convertDimensionStringValue(dimensionValues)).toEqual(["200", "300", "400", "500", "600", "700", "800", "850"])
})

test('convert dimension value seperated with comma and return texts', () => {
  const dimensionValues = "first, second, third"
  expect(convertDimensionStringValue(dimensionValues)).toEqual(["first", "second", "third"])
})

test('should return array with texts as items', () => {
  const dimensionValues = "first, second, third"
  expect(parseDimensionValues(dimensionValues)).toEqual(["first", "second", "third"])
})

test('should return array with dates as items', () => {
  const dimensionValues = "2005-01-01T12:00:00Z/2005-01-05T12:00:00Z/PT24H"
  expect(parseDimensionValues(dimensionValues)).toEqual(["2005-01-01", "2005-01-02", "2005-01-03", "2005-01-04", "2005-01-05"])
})

test('should return array with numbers items', () => {
  const dimensionValues = "200, 300, 400, 500,600, 700,800,850"
  expect(parseDimensionValues(dimensionValues)).toEqual(["200", "300", "400", "500", "600", "700", "800", "850"])
})
