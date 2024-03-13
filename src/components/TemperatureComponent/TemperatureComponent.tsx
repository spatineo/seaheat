import React, { useMemo } from 'react';
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
import { depth } from '../../../stories/components/Temperature.data';

interface Axis {
  label: string,
  values: number[];
}

interface Value {
  x: string|number,
  y: number,
  value?: number
}

interface Legend {
  minValue: number,
  maxValue: number,
  color: string
}

interface TemperatureProps {
  axes: {
    x: Axis,
    y: Axis
  },
  data: Value[],
  legend: Legend[]
  seabedDepth: number,
}

function heightOfStep(depth: number[], step: number) {
  if (step < 0 || (step+1) >= depth.length) throw new Error("illegal step "+step);
  const a = step > 0 ? depth[step-1] : 0;
  const b = depth[step];
  const c = depth[step+1];
  return (b-a)/2 + (c-b)/2;
}

export const TemperatureComponent = (options: TemperatureProps) => {
 
  const { tableContent, legendsContent } = useMemo(() => {

    const calculatedData = options.axes.y.values.map(yValue => {
      //const step = Math.abs(yValue /10);  
      console.log(options.axes.y.values.map(item => Math.abs(item)))
      return {
        yValueNumber: yValue,
        height: heightOfStep(depth, Math.abs(yValue/10)),
        cells: options.axes.x.values.map(xValue => {
          const cellValue = options.data.find(d => d.x === xValue && d.y === yValue)?.value;
          if(!cellValue) return;
          const legendItem = options.legend.find(l => l.minValue <= cellValue && cellValue <= l.maxValue);
          const bgColor = legendItem && legendItem.color;
          return { x: xValue, y: yValue, value: cellValue, bgColor: bgColor };
        })
      };
    });
  
    const tableContent = (
      <Box overflowX="auto">
        <Table className='temperature-component-table' variant="simple" size="sm">
          <Thead>
            <Tr>
              {options.axes.x.values.map((value, index) => <Th key={index} m={8}>{value}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
          {calculatedData.map((rowData, rowIndex) => {
          
            return (
            <React.Fragment key={rowIndex}>
              {(rowData !== undefined) && Math.abs(rowData.yValueNumber) < 60 && (
                //Tein laskelman näin että visualisesti näkyy eron style={{ height: `${rowData.height < 0 ? 1 : rowData.height + (rowIndex * 15)}px` }}
                <Tr className='temperature-component-tr' style={{ height: `${rowData.height < 0 ? 1 : rowData.height + (rowIndex * 15)}px` }}>
                  {rowData.cells.map((cell, cellIndex) => {
                    return (
                    <Td key={cellIndex} className={'temperature-component-td'} bgColor={cell?.bgColor}>
                      {/* {cell && typeof cell.value === "number" && `\u00A0`} */}
                      { cell?.value && Math.abs(cell?.value)}
                    </Td>
                  )}
                  )}
                  <Th>{rowData.cells[0]?.y}</Th> 
                </Tr>
              )}
              {Math.abs(rowData.yValueNumber) >= 60 && (
                <Tr className='temperature-component-tr'>
                  <Td colSpan={options.axes.x.values.length} bgColor="#949494" className='temperature-component-th'>{options.seabedDepth}</Td>
                  <Th>{rowData.cells[0]?.y}</Th>
                </Tr>
              )}
            </React.Fragment>
          )
              })}
        </Tbody>

        </Table>
      </Box>
    );

    const legendsContent = (
      <Box boxSizing='border-box'>
        <Flex flexWrap="wrap" mt={4}>
          {options.legend.map(({ color, minValue, maxValue }, index) => (
            <Box m="2" key={index}>
              <Flex alignItems="center" mr={4} mb={4}>
                <Box mr={2} bgColor={color} minW="12" minH="10"></Box>
                <Box>{maxValue < 0 ? '< 0 °C' : minValue >= 26 ? '> 25 °C' : `${minValue} - ${maxValue} °C`}</Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    );

    return { tableContent, legendsContent };
  }, [options]);

  return (
    <Box p="4" boxSizing='border-box' w="70%">
      <Box>{tableContent}</Box>
      <Box>{legendsContent}</Box>
    </Box>
  );
}