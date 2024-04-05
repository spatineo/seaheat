import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@chakra-ui/react';
import { EChartOption } from "echarts";

interface GraphOptions {
  option: EChartOption
}

export const GraphComponent = ({ option }: GraphOptions) => {
  const graphRef = useRef<HTMLDivElement>(null)
  const [graph, setGraph] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!graphRef.current) {
      return;
    }

    const g = echarts.init(graphRef.current, null, {
      height: 300,
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
    <Box sx={{ minW: "100%", border: "1px solid black"}}>
      <Box ref={graphRef}>
      </Box>
    </Box>
  )
}