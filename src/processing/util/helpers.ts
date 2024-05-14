import { isAfter, parseISO, isValid, add, format } from "date-fns"
import * as duration from "duration-fns"

function isValidDateString (dateString: string) {
  return isValid(parseISO(dateString))
}

export function convertDimensionStringValue (stringValue: string) {
  // eslint-disable-next-line no-useless-escape
  return stringValue.trim().split(/[,\/]+/)
    .map(value => value.trim())
    .filter(value => value !== '')
}

export function parseDimensionValues (valueString: string) {
  const values = convertDimensionStringValue(valueString)
  const parsedValues: (string | Date)[] = []
  if (isValidDateString(values[0]) && isValidDateString(values[1])) {
    const parsedDuration = duration.toDays(values[2])
    if (!isAfter(values[0], values[1])) {
      const startDate = new Date(values[0])
      const endDate = new Date(values[1])
      let currentDate: Date = new Date(startDate)

      while (currentDate <= endDate) {
        parsedValues.push(format(new Date(currentDate), "yyy-MM-dd"))
        currentDate = add(currentDate, { days: parsedDuration })
      }
    }
  } else {
    parsedValues.push(...values)
  }
  return parsedValues
}
