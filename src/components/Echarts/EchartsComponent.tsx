import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Box } from "@chakra-ui/react";

interface ChartProps {
  option: echarts.EChartsOption;
  height?: number;
}

const EchartsComponent: React.FC<ChartProps> = ({
  option,
  height,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [graphChart, setGraphChart] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const chart = echarts.init(chartRef.current, {
      height: `${height}`
    });

    if (!chart.isDisposed()) {
      setGraphChart(chart);
    }

    const handleResize = () => {
      if (chart && !chart.isDisposed()) {
        chart.resize();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chart) {
        chart.dispose();
      }
    };
  }, [height]);

  useEffect(() => {
    if (!graphChart) return;
    graphChart.setOption(option);
  }, [option, graphChart]);

  return (
    <Box
      sx={{ width: "100%", height: `${height}px`, margin: "auto" }}
      ref={chartRef}
    ></Box>
  );
};

export default EchartsComponent;
