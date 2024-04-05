import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@chakra-ui/react';
import { EChartOption } from "echarts";

interface Axis <T>{
  label: string,
  values: T[];
}

export interface Series {
  label: string,
  values: Array<number>
}
interface GraphOptions {
  optionData: {
    unit: string,
    axes: {
        x: Axis<string>
    },
    series: Array<Series>
  }
}

export const GraphComponent = ({ optionData }: GraphOptions) => {
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
    if (!graph || !optionData || !Array.isArray(optionData.series) || optionData.series.length === 0) {
      return;
  }
    if ((optionData !== null && optionData !== undefined )&& (typeof optionData === 'object' && optionData.series !== undefined)) {
      const options: EChartOption = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: optionData.series.map(serie => serie.label)
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
          data: optionData.axes.x.values
        },
        yAxis: {
          type: 'value'
        },
        series: optionData.series.map(serie => ({
          name: serie.label,
          type: 'line',
          data: serie.values
        }))
      };
      graph.setOption(options);
    }
  
  }, [optionData, graph]);

  return (
    <Box sx={{minW: "100%", border: "1px solid #DCDCDC", borderRadius: "6px"}}>
      <Box ref={graphRef}>
      </Box>
    </Box>
  )
}