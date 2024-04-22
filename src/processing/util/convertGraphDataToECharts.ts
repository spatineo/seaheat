import { GraphData } from "../../types"

export const convertGraphDataToECharts = (data: GraphData) => {
  return {
    title: {
      text: data.unit,
      right: '6%',
      top: 20
    },
    legend: {
      data: data.series.map(serie => serie.label),
      orient: "vertical" as const,
      right: "2%",
      top: 50
    },
    series: data.series.map(serie => ({
      name: serie.label,
      type: 'line',
      data: serie.values
    }))
  }
}