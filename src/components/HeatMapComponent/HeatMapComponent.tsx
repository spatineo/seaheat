import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Box } from '@chakra-ui/react';
import { EChartOption } from "echarts";
import { TemperatureProps } from '../../types';

interface HeatMapProps {
  height: number;
  data: TemperatureProps;
}

export const HeatMapComponent = ({ height, data }: HeatMapProps) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [graph, setGraph] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!graphRef.current) {
      return;
    }

    const g = echarts.init(graphRef.current, null, {
      height,
      renderer: 'canvas',
      useDirtyRect: false,
    });
    setGraph(g);

    return () => {
      g.dispose(); // Dispose chart instance on unmount
    };
  },[graphRef, height]);

  useEffect(() => {
    if(!graph || !data) {
      return;
    }

    //const xAxisData = data.data.axes.x.values;
    //const yAxisData = data.data.axes.y.values.filter(y => y < data.data.seabedDepth).map(y => Number(y).toFixed(2));
    //const values = data.data.temperatureValues.map(({x, y, value}) => [x, y, value]);
   /*  const yAxisDataAsString = yAxisData.map(y => Number(y).toFixed(2)); 
    yAxisDataAsString.push('50')
    console.log(yAxisData) */

    const convertData = (d: TemperatureProps): EChartOption => {
      //const yAxisData = d.data.axes.y.values.filter(y => y < data.data.seabedDepth).map(y => Number(y).toFixed(2));
      const calculatedData = d.data.axes.y.values
      .filter((yValue) => (d.data.seabedDepth !== null) && yValue < d.data.seabedDepth)
      .map((yValue, yIndex) => {
        return {
          yValueNumber: yValue,
          cells: d.data.axes.x.values.map((xValue, xIndex) => {
            const cellValue = d.data.temperatureValues.find(
              (d) => d.x === xIndex && d.y === yIndex
            )?.value;
            if (cellValue === null || cellValue === undefined) return;
            const legendItem = d.data.legend.find(
              (l) => l.minValue <= cellValue && cellValue <= l.maxValue
            );
            const bgColor = legendItem && legendItem.color;
            return { x: xValue, y: yValue, value: cellValue, bgColor: bgColor };
          }),
        };
      });
  
      console.log(calculatedData)
      const backgroundColor = calculatedData[0]?.cells[0]?.bgColor ?? 'blue';
      const xAxisData = calculatedData[0]?.cells
      .map(cell => cell?.x)
      .filter(x => typeof x === 'string' || typeof x === 'number') as (string | number)[];
    

      return {
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'category',
          data: calculatedData.map(({ yValueNumber }) => yValueNumber.toFixed(2)),
        },  visualMap: [{
          type: 'continuous',
          calculable: true,
          orient: 'vertical', 
          right: 0,
          bottom: '15%',
        }],
        series: [{
          type: 'heatmap',
          data: d.data.temperatureValues.map(({x, y, value}) => [x, y, value]),
          coordinateSystem: 'cartesian2d',
          label: { 
            show: true, 
            color: 'blue',
            backgroundColor: backgroundColor,
            position: ['30%', '50%']
          }
        }],
      };
    
     /*   return {
        xAxis: {
          type: 'category',
          data:  d.data.axes.x.values,
        },
        yAxis: {
          type: 'category',
          data: yAxisData
      },
      visualMap: [{
        type: 'continuous',
        calculable: true,
        orient: 'vertical', 
        right: 0,
        bottom: '15%',
      }],
      series: [{
        type: 'heatmap',
        data: d.data.temperatureValues.map(({x, y, value}) => [x, y, value]),
        coordinateSystem: 'cartesian2d',
        label: { 
          show: true, 
          color: 'blue',
          backgroundColor: 'blue',
          position: ['30%', '50%']
        }
      }]
    } */
    }

    const option: EChartOption = {
      tooltip: {},
      grid: {
        right:70,
        left: 40
      },
      ...convertData(data)
     /*  xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'category',
        data: yAxisDataAsString
        
      },
      visualMap: [{
        type: 'continuous',
        calculable: true,
        orient: 'vertical', 
        right: 0,
        bottom: '15%',
      }],
      series: [
        {
          name: 'Sea heat',
          type: 'heatmap',
          data: values,
          emphasis: {
            itemStyle: {
              borderColor: '#333',
              borderWidth: 1
            }
          },
          progressive: 10,
          animation: false,
          label: { 
            show: false, 
            color: 'blue',
            backgroundColor: 'blue'
          }
        }
      ] */
    };
    console.log(option)
    graph.setOption(option);
  }, [graph, data]);

  return (
    <Box borderWidth='1px' borderRadius='lg' padding={0} height='100%'>
      <Box ref={graphRef} style={{width: '100%', height: '100%'}}></Box>
    </Box>
  );
};
