import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@chakra-ui/react';
import { EChartOption } from "echarts";

interface GraphOptions {
  option: EChartOption
  height: number
}

export const GraphComponent = ({ option, height }: GraphOptions) => {
  const graphRef = useRef<HTMLDivElement>(null)
  const [graph, setGraph] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!graphRef.current) {
      return;
    }

    const g = echarts.init(graphRef.current, null, {
      renderer: 'canvas',
      useDirtyRect: false
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
    if (!graph) return;
    if (option && typeof option === 'object') {
      graph.setOption(option);
    }
  
  }, [option, graph]);

  return (
    <Box ref={graphRef} style={{ width: "auto",height: `${height}px`, margin: "auto" }}>
    </Box>
  )
}