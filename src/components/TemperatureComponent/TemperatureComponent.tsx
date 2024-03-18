import { useMemo } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from '@chakra-ui/react'
import './TemperatureComponent.css';

interface Axis <T>{
  label: string,
  values: T[];
}


interface Value {
  x: number,
  y: number,
  value: number
}

interface Legend {
  minValue: number,
  maxValue: number,
  color: string
}

interface TemperatureProps {
  axes: {
    x: Axis<string>,
    y: Axis<number>
  },
  ticks: number[]
  data: Value[],
  legend: Legend[]
  seabedDepth: number,
}

function heightOfStep(depth: number[], step: number) {
  if (step < 0 || step >= depth.length) throw new Error("illegal step "+step);
  const a = step > 0 ? depth[step-1] : 0;
  const b = depth[step];
  const c = step < (depth.length-1) ? depth[step+1] : (depth[step] + (b-a));
  return (b-a)/2 + (c-b)/2;
}

export const TemperatureComponent = (options: TemperatureProps) => {
  let mH = 0;
  const heightInPixel = 300;
  const { calculatedData } = useMemo(() => {
    const calculatedData = options.axes.y.values.filter(yValue => yValue < options.seabedDepth).map((yValue, yIndex) => {
      const height = heightOfStep(options.axes.y.values, yIndex);
      return {
        yValueNumber: yValue,
        height,
        cells: options.axes.x.values.map((xValue, xIndex) => {
          const cellValue = options.data.find(d => d.x === xIndex && d.y === yIndex)?.value;
          if(!cellValue) return;
          const legendItem = options.legend.find(l => l.minValue <= cellValue && cellValue <= l.maxValue);
          const bgColor = legendItem && legendItem.color;
          return { x: xValue, y: yValue, value: cellValue, bgColor: bgColor };
        })
      };
    });
    return { calculatedData };
  }, [options]);


  const tableContent = (
    <Box>
      <Table className='temperature-component-table' variant="simple" w="100%" p="0" m="0">
        <Thead>
          <Tr>
            {options.axes.x.values.map((value, index) => <Th key={index} m={8}>{value}</Th>)}
          </Tr>
        </Thead>
        <Tbody h={heightInPixel} p="0" m="0">
          {calculatedData.filter(rowData => rowData.yValueNumber < options.seabedDepth).map((rowData, rowIndex) => {
             const rowHeight = rowData.height / options.seabedDepth * heightInPixel;
             mH += rowHeight;
             console.log(mH);
            return(
              <Tr key={rowIndex} className='temperature-component-tr' style={{ height: `${rowData.height/options.seabedDepth*heightInPixel}px` }}>
                {rowData.cells.map((cell, cellIndex) => (
                  <Td key={cellIndex} className={'temperature-component-td'} bgColor={cell?.bgColor}></Td>
                ))}

               { rowIndex === 0 && (<Th className='temperature-component-th' rowSpan={calculatedData.length}>
                <Box position="absolute" top="0" h="100%">
                {options.ticks.map(tick => 
                <Box 
                  position="absolute"
                  boxSizing='border-box'
                  top={(tick / options.seabedDepth) * (heightInPixel - (20/2))}>
                    -{tick}
                    </Box>)}
                </Box>
               </Th>)}


              </Tr>
            )}
          )
          }
          <Tr className='temperature-component-tr'>
            <Td colSpan={options.axes.x.values.length} bgColor="#949494" textAlign="center">{options.seabedDepth}</Td>
            <Th></Th>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );

  const legendsContent = (
    <Flex 
      boxSizing='border-box' 
      w="100%"
      mt="4"
      flexWrap="wrap"
      >
        {options.legend.map(({ color, minValue, maxValue }, index) => (
            <Box key={index}  w="24%" sx={{ display: "flex", alignItems: "center"}} mb="2" >
              <Box mr={2} bgColor={color} w="16%" h="60%">
              </Box>
              <Flex>
                {maxValue < 0 ? (<Box>{'< 0 °C'}</Box>): minValue >= 26 ? '> 25 °C' : (<Box>{`${minValue} - ${maxValue} °C`}</Box>)}
              </Flex>
            </Box>
        ))}
    </Flex>
  );


  return (
    <Box p="4" boxSizing='border-box' w="100%">
      <Box>{tableContent}</Box>
      <Box>{legendsContent}</Box>
    </Box>
  );
}