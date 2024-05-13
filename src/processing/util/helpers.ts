import { isBefore, parseISO, isValid, add, format } from "date-fns"

function isValidDateString (dateString: string): boolean {
  return isValid(parseISO(dateString))
}

export function parseDimensionValues (valueString: string) {
  // eslint-disable-next-line no-useless-escape
  const values = valueString.split(/[,\//]/).filter(value => value.trim() !== '')
  const allNumbers = values.every(value => !isNaN(parseFloat(value)))
  if (allNumbers) {
    return values.map(value => parseFloat(value))
  }
  const parsedValues: (string | Date)[] = []
  const index = 0
  if (index < values.length) {
    const startTimeString = values[index]
    const endTimeString = values[index + 1]
    if (isValidDateString(startTimeString) && isValidDateString(endTimeString)) {
      const startDate = parseISO(startTimeString)
      const endDate = parseISO(endTimeString)
      let currentDate = startDate
      while (isBefore(currentDate, endDate) || currentDate.getTime() === endDate.getTime()) {
        parsedValues.push(format(currentDate, "yyyy-MM-dd"))
        currentDate = add(currentDate, { days: 1 })
      }
    }
  }
  return parsedValues
}
