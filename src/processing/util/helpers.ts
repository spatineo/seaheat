import { add } from "date-fns"
import * as duration from "duration-fns"

export function convertDimensionStringValue (stringValue: string) {
  return stringValue.split('/')
}

export function parseDimensionValues (dimensionValues: string) {
  const initSplit = dimensionValues.split(/,/).map(value => value.trim())

  const parsedValues: string[] = []
  for (const value of initSplit) {
    if (value.includes("/")) {
      const valuesWithSlash = convertDimensionStringValue(value)
      const startDate = new Date(valuesWithSlash[0])
      const endDate = new Date(valuesWithSlash[1])
      const parsedDuration = duration.parse(valuesWithSlash[2])
      let currentDate = new Date(startDate)
      while (currentDate <= endDate) {
        parsedValues.push(new Date(currentDate).toISOString())
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        currentDate = add(currentDate, parsedDuration)
      }
    } else {
      parsedValues.push(value)
    }
  }
  return parsedValues
}
