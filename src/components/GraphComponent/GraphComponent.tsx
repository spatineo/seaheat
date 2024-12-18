import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { Box } from '@chakra-ui/react'
import { EChartOption } from "echarts"
import { GraphData } from '../../types'
import { convertGraphDataToECharts } from '../../processing/util/convertGraphDataToECharts'

interface GraphProps {
  data: GraphData
  height: number
}

export const GraphComponent: React.FC<GraphProps> = ({ data, height }: GraphProps) => {
  const graphRef = useRef<HTMLDivElement>(null)
  const [graph, setGraph] = useState<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!graphRef.current) {
      return
    }

    const g = echarts.init(graphRef.current, null, {
      height,
      renderer: 'canvas',
      useDirtyRect: false
    })
    setGraph(g)

    const handleResize = () => {
      if (g && !g.isDisposed()) {
        g.resize()
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      g.dispose()
    }
  }, [graphRef, height])

  useEffect(() => {
    if (!graph) {
      return
    }

    const options: EChartOption = {
      ...convertGraphDataToECharts(data),
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '150px',
        bottom: '3%',
        top: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.axes.x.values
      },
      yAxis: {
        type: 'value'
      }
    }
    graph.setOption(options)
  }, [data, graph])

  return (
    <Box ref={graphRef}>
    </Box>
  )
}
