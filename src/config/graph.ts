import { OutputType } from "../app/slices/data"

export const OutputTitle = new Map<OutputType, string>()
OutputTitle.set(OutputType.monthlyAveragePowerOutput, "Total Output per Month")
OutputTitle.set(OutputType.monthlyPowerRating, "Power per Month")