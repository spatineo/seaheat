import { GraphData } from "../../types"

export const convertGraphDataToECharts = (data: GraphData) => {
  return {
    legend: {
      data: data.series.map(serie => serie.label)
    },
    series: data.series.map(serie => ({
      name: serie.label,
      type: 'line',
      data: serie.values
    }))
  }
}