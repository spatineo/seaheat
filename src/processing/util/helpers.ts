import { add } from "date-fns"
import * as duration from "duration-fns"

export function convertDimensionStringValue (stringValue: string) {
  const initSplit = stringValue.split(/[,]/).map(value => value.trim())
  let seperator = false

  for (const value of initSplit) {
    if (value.includes("/")) {
      seperator = true
      break
    }
  }

  return {
    seperator,
    value: initSplit
  }
}

export function parseDimensionValues (valueString: string) {
  const values = convertDimensionStringValue(valueString)
  console.log('values', values)
  const parsedValues: string[] = []
  if (values.seperator) {
    const items = values.value[0]
    const durationValue = values.value[0].split("/")[2]
    const parsedDuration = duration.parse(durationValue)

    const startDate = new Date(items.split('/')[0])
    const endDate = new Date(items.split('/')[1])
    let currentDate: Date = new Date(startDate)

    while (currentDate <= endDate) {
      parsedValues.push(new Date(currentDate).toISOString())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      currentDate = add(currentDate, parsedDuration)
    }
  } else {
    values.value.forEach(val => parsedValues.push(val))
  }
  return parsedValues
}
