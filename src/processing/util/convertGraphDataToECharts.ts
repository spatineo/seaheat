import { GraphData } from "../../types"

export const convertGraphDataToECharts = (data: GraphData) => {
  return {
    title: {
      text: data.unit,
      right: 80,
      top: 20
    },
    legend: {
      data: data.series.map(serie => serie.label),
      orient: "vertical" as const,
      right: "0%",
      top: 50
    },
    series: data.series.map(serie => ({
      name: serie.label,
      type: 'line',
      data: serie.values
    }))
  }
}