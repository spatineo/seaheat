import { EChartOption } from "echarts"
import { functions } from "../../config/scenarios"
import { GraphData } from "../../types"

export const convertGraphDataToECharts = (data: GraphData): EChartOption => {
  // const scenario = scenarios.find(s => s.id === data.scenarioId)
  const funct = functions.find(f => f.id === data.functionId)

  return {
    legend: {
      data: data.series.map(serie => serie.label),
      formatter: funct ? () => funct.name : undefined,
      orient: "vertical" as const,
      top: '50',
      right: '1%'
    },
    series: data.series.map(serie => ({
      name: serie.label,
      type: 'line',
      data: serie.values
    }))
  }
}
