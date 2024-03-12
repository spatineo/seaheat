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
import { heightOfStep } from '../../utils/helpers.functions';
import { depth } from '../../../stories/components/Temperature.data';

interface XAxis {
  label: string,
  values: (string|number)[];
}

interface YAxis {
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
    x: XAxis,
    y: YAxis
  },
  data: Value[],
  legend: Legend[]
  seabedDepth: number,
}

export const TemperatureComponent = (options: TemperatureProps) => {
 
  const { tableContent, legendsContent } = useMemo(() => {

    const calculatedData = options.axes.y.values.map(yValue => {
      const seabed = Math.abs(options.seabedDepth);
      const len = depth.findIndex(d => d >= seabed)
      console.log(seabed, len)
      for(let i = 0; i <= len; i++){
        console.log(heightOfStep(depth, i))
      }
      return {
        yValueNumber: yValue,
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
                <Tr className='temperature-component-tr'>
                  {rowData.cells.map((cell, cellIndex) => {
                    return (
                    <Td key={cellIndex} className={'temperature-component-td'} bgColor={cell?.bgColor}>
                      {cell && typeof cell.value === "number" && `\u00A0`}
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