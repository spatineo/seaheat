import { expect, test } from "vitest"
import { acceptDistances } from '../processing/util/mathMiddlewareHelper'

test('math middleware test', () => {
  const intakeLocation = null
  const facilityLocation = null
  expect(acceptDistances(intakeLocation, facilityLocation)).toBeNull()
})
