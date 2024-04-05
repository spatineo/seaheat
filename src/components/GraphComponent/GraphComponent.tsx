import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@chakra-ui/react';
import { EChartOption } from "echarts";
import { GraphData } from '../../types';
import { convertGraphDataToECharts } from '../../processing/util/convertGraphDataToECharts'

interface GraphProps {
  data: GraphData
}

export const GraphComponent = ({ data }: GraphProps) => {
  const graphRef = useRef<HTMLDivElement>(null)
  const [graph, setGraph] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!graphRef.current) {
      return;
    }

    const g = echarts.init(graphRef.current, null, {
      height: 300,
      renderer: 'canvas',
      useDirtyRect: false,
    });

    if (!g.isDisposed()) {
      setGraph(g);
    }

    const handleResize = () => {
      if (g && !g.isDisposed()) {
        g.resize();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (g) {
        g.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!graph || !data || !Array.isArray(data.series) || data.series.length === 0) {
      return;
  }
    if ((data !== null && data !== undefined )&& (typeof data === 'object' && data.series !== undefined)) {
      const options: EChartOption = {
        ...convertGraphDataToECharts(data),
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
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
      };
      graph.setOption(options);
    }
  
  }, [data, graph]);

  return (
    <Box sx={{minW: "100%", border: "1px solid #DCDCDC", borderRadius: "6px"}}>
      <Box ref={graphRef}>
      </Box>
    </Box>
  )
}