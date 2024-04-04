import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { GraphComponent } from '../../src/components/GraphComponent/GraphComponent';
import { emptyGraphData } from '../../src/types';
import { EChartOption } from "echarts";



const meta = {
  title: 'Components/GraphComponent',
  component: GraphComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof GraphComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

console.log(emptyGraphData())

const data = {
  "unit": "MW",
  "axes": {
      "x": {
          "label": "Month",
          "values": [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
          ]
      }
  },
  "series": [
      {
          "label": "Monthly output",
          "values": [
              60.917536778111995,
              98.2540915776,
              34.810021016064,
              25.26533783424,
              43.512526270079995,
              84.21779278079998,
              43.512526270079995,
              34.810021016064,
              42.10889639039999,
              113.13256830220797,
              42.10889639039999,
              60.917536778111995
          ]
      }
  ]
}
const newSeriesValues = [
  84.21779278079998,
  43.512526270079995,
  34.810021016064,
  42.10889639039999,
  113.13256830220797,
  42.10889639039999,
  60.917536778111995,
  60.917536778111995,
  98.2540915776,
  34.810021016064,
  25.26533783424,
  43.512526270079995,
]

const options: EChartOption = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: data.series.map(serie => serie.label)
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
  },
  series: data.series.map(serie => ({
    name: serie.label,
    type: 'line',
    data: serie.values
  }))
};

export const Primary: Story = {
  args: {
    option: options,
    height: 300
  },
  render: () => {
    return (
      <div style={{ width: "30em"}}>
        <GraphComponent option={options} height={300} />
      </div>
    );
  }
};

export const Secondary: Story = {
  args: {
    option: options,
    height: 300
  },
  render: () => {
    return (
      <div style={{ width: "30em"}}>
        <GraphComponent option={{...options,  
        legend: {
          data: ["Monthly output", "Month"]
        },
        series: [
          ...data.series.map(serie => ({
            name: serie.label,
            type: 'line',
            data: serie.values
          })),
          {
            name: 'Month',
            type: 'line',
            data: newSeriesValues
          }
        ]
        ,}} height={300}/>
      </div>
    );
  }
};
