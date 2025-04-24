import { OutputType } from "../app/slices/data"

export const OutputTitle = new Map<OutputType, string>()
OutputTitle.set(OutputType.monthlyAveragePowerOutput, "Total Output per Month")
OutputTitle.set(OutputType.monthlyPowerRating, "Power per Month")
OutputTitle.set(OutputType.intakeTemperaturePerMonth, "Temperature at intake depth")
OutputTitle.set(OutputType.temperatureAtDischargeDepth, "Temperature at discharge depth")
OutputTitle.set(OutputType.waterThroughputVolume, "Water throughput volume")
OutputTitle.set(OutputType.dischargeWaterTemperature, "Discharge water temperature")
OutputTitle.set(OutputType.dischargeTemperatureDifference, "Discharge temperature difference")
OutputTitle.set(OutputType.impactAnalysis, "Discharge impact area")
