import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { HeatMapComponent } from '../../src/components/HeatMapComponent/HeatMapComponent';

const meta = {
  title: 'Components/HeatMapComponent',
  component: HeatMapComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof HeatMapComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const data = {
  marker: 25,
  data: {
  axes: {
    x: {
      label: 'Month',
      values: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    y: {
      label: 'Depth',
      values: [  
        0.5016462, 1.515992, 2.548084, 3.602298, 4.684081, 5.8002, 6.959055, 8.171057, 9.449085, 10.80904, 
        12.27047, 13.85737, 15.59901, 17.53092, 19.69594, 22.14526, 24.93938, 28.14896, 31.85507, 36.14899, 41.13091, 
        46.90754, 53.58818, 61.27954, 70.07922, 80.06874, 91.30695, 103.8247, 117.622, 132.668, 148.9038, 166.248, 184.6028, 
        203.8617, 223.9153, 244.6568, 265.9862, 287.8122, 310.0536, 332.6397, 355.5102, 378.6138, 401.9077, 425.3563, 448.9304, 472.6059, 496.3634
      ]
    }
  },
  ticks: [10, 20, 30, 40, 50],
  temperatureValues: [
    { x: 0, y: 0, value: 1 },
    { x: 0, y: 1, value: 1 },
    { x: 0, y: 2, value: 3 },
    { x: 0, y: 3, value: 4},
    { x: 0, y: 4, value: 3},
    { x: 0, y: 5, value: 2},
    { x: 0, y: 6, value: 4},
    { x: 0, y: 7, value: 4},
    { x: 0, y: 8, value: 4},
    { x: 0, y: 9, value: 4},
    { x: 0, y: 10, value: 4},
    { x: 0, y: 11, value: 4},
    { x: 0, y: 12, value: 4},
    { x: 0, y: 13, value: 4},
    { x: 0, y: 14, value: 4},
    { x: 0, y: 15, value: 4},
    { x: 0, y: 16, value: 4},
    { x: 0, y: 17, value: 4},
    { x: 0, y: 18, value: 4},
    { x: 0, y: 19, value: 4},
    { x: 0, y: 20, value: 4},
    { x: 0, y: 21, value: 4},
    { x: 0, y: 22, value: 60},

    { x: 1, y: 0, value: -1},
    { x: 1, y: 1, value: -1},
    { x: 1, y: 2, value: 2},
    { x: 1, y: 3, value: 4},
    { x: 1, y: 4, value: 4},
    { x: 1, y: 5, value: 4},
    { x: 1, y: 6, value: 4},
    { x: 1, y: 7, value: 4},
    { x: 1, y: 8, value: 4},
    { x: 1, y: 9, value: 4},
    { x: 1, y: 10, value: 4},
    { x: 1, y: 11, value: 1},
    { x: 1, y: 12, value: 2},
    { x: 1, y: 13, value: 2},
    { x: 1, y: 14, value: 2},
    { x: 1, y: 15, value: 2},
    { x: 1, y: 16, value: 1},
    { x: 1, y: 17, value: 1},
    { x: 1, y: 18, value: 1},
    { x: 1, y: 19, value: 1},
    { x: 1, y: 20, value: 2},
    { x: 1, y: 21, value: 1},
    { x: 1, y: 22, value: 60},

    { x: 2, y: 0, value: 6},
    { x: 2, y: 1, value: 6},
    { x: 2, y: 2, value: 6},
    { x: 2, y: 3, value: 2},
    { x: 2, y: 4, value: 2},
    { x: 2, y: 5, value: 2},
    { x: 2, y: 6, value: 2},
    { x: 2, y: 7, value: 2},
    { x: 2, y: 8, value: 2},
    { x: 2, y: 9, value: 2},
    { x: 2, y: 10, value: 2},
    { x: 2, y: 11, value: 2},
    { x: 2, y: 12, value: 2},
    { x: 2, y: 13, value: 2},
    { x: 2, y: 14, value: 2},
    { x: 2, y: 15, value: 2},
    { x: 2, y: 16, value: 2},
    { x: 2, y: 17, value: 2},
    { x: 2, y: 18, value: 2},
    { x: 2, y: 19, value: 2},
    { x: 2, y: 20, value: 2},
    { x: 2, y: 21, value: 2},
    { x: 2, y: 22, value: 60},

    { x: 3, y: 0, value: 6},
    { x: 3, y: 1, value: 7},
    { x: 3, y: 2, value: 7},
    { x: 3, y: 3, value: 7},
    { x: 3, y: 4, value: 9},
    { x: 3, y: 5, value: 8},
    { x: 3, y: 6, value: 10},
    { x: 3, y: 7, value: 10},
    { x: 3, y: 8, value: 4},
    { x: 3, y: 9, value: 4},
    { x: 3, y: 10, value: 4},
    { x: 3, y: 11, value: 4},
    { x: 3, y: 12, value: 4},
    { x: 3, y: 13, value: 4},
    { x: 3, y: 14, value: 4},
    { x: 3, y: 15, value: 4},
    { x: 3, y: 16, value: 4},
    { x: 3, y: 17, value: 4},
    { x: 3, y: 18, value: 4},
    { x: 3, y: 19, value: 4},
    { x: 3, y: 20, value: 4},
    { x: 3, y: 21, value: 4},
    { x: 3, y: 22, value: 60},

    { x: 4, y: 0,value: 11},
    { x: 4, y: 1, value: 12},
    { x: 4, y: 2, value: 15},
    { x: 4, y: 3, value: 15},
    { x: 4, y: 4, value: 14},
    { x: 4, y: 4, value: 15},
    { x: 4, y: 5, value: 14},
    { x: 4, y: 6, value: 7},
    { x: 4, y: 7, value: 7},
    { x: 4, y: 8, value: 7},
    { x: 4, y: 9, value: 7},
    { x: 4, y: 10, value: 10},
    { x: 4, y: 11, value: 10},
    { x: 4, y: 12, value: 9},
    { x: 4, y: 13, value: 7},
    { x: 4, y: 14, value: 7},
    { x: 4, y: 15, value: 7},
    { x: 4, y: 16, value: 4},
    { x: 4, y: 17, value: 4},
    { x: 4, y: 18, value: 4},
    { x: 4, y: 19, value: 4},
    { x: 4, y: 20, value: 4},
    { x: 4, y: 21, value: 4},
    { x: 4, y: 22, value: 50},

    { x: 5, y: 0, value: 16},
    { x: 5, y: 1, value: 17},
    { x: 5, y: 2, value: 17},
    { x: 5, y: 3, value: 13},
    { x: 5, y: 4, value: 14},
    { x: 5, y: 5, value: 14},
    { x: 5, y: 6, value: 15},
    { x: 5, y: 7, value: 13},
    { x: 5, y: 8, value: 8},
    { x: 5, y: 9, value: 8},
    { x: 5, y: 10, value: 7},
    { x: 5, y: 11, value: 7},
    { x: 5, y: 12, value: 7},
    { x: 5, y: 13, value: 7},
    { x: 5, y: 14, value: 7},
    { x: 5, y: 15, value: 7},
    { x: 5, y: 16, value: 7},
    { x: 5, y: 17, value: 7},
    { x: 5, y: 18, value: 3},
    { x: 5, y: 19, value: 3},
    { x: 5, y: 20, value: 3},
    { x: 5, y: 21, value: 3},
    { x: 5, y: 22, value: 60},

    { x: 6, y: 0, value: 24},
    { x: 6, y: 1, value: 21},
    { x: 6, y: 2, value: 23},
    { x: 6, y: 3, value: 17},
    { x: 6, y: 4, value: 17},
    { x: 6, y: 5, value: 17},
    { x: 6, y: 6, value: 14},
    { x: 6, y: 7, value: 14},
    { x: 6, y: 8, value: 14},
    { x: 6, y: 9, value: 9},
    { x: 6, y: 10, value: 9},
    { x: 6, y: 11, value: 9},
    { x: 6, y: 12, value: 9},
    { x: 6, y: 13, value: 9},
    { x: 6, y: 14, value: 9},
    { x: 6, y: 15, value: 9},
    { x: 6, y: 16, value: 8},
    { x: 6, y: 17, value: 8},
    { x: 6, y: 18, value: 8},
    { x: 6, y: 19, value: 4},
    { x: 6, y: 20, value: 4},
    { x: 6, y: 21, value: 4},
    { x: 6, y: 22, value: 60},

    { x: 7, y: 0, value: 24},
    { x: 7, y: 1, value: 21},
    { x: 7, y: 2, value: 20},
    { x: 7, y: 3, value: 18},
    { x: 7, y: 4, value: 18},
    { x: 7, y: 5, value: 17},
    { x: 7, y: 6, value: 19},
    { x: 7, y: 7, value: 19},
    { x: 7, y: 8, value: 18},
    { x: 7, y: 9, value: 18},
    { x: 7, y: 10, value: 18},
    { x: 7, y: 11, value: 15},
    { x: 7, y: 12, value: 15},
    { x: 7, y: 13, value: 15},
    { x: 7, y: 14, value: 12},
    { x: 7, y: 15, value: 12},
    { x: 7, y: 16, value: 12},
    { x: 7, y: 17, value: 5},
    { x: 7, y: 18, value: 5},
    { x: 7, y: 19, value: 5},
    { x: 7, y: 20, value: 1},
    { x: 7, y: 21, value: 1},
    { x: 7, y: 22, value: 60},

    { x: 8, y: 0, value: 16},
    { x: 8, y: 1, value: 16},
    { x: 8, y: 2, value: 16},
    { x: 8, y: 3, value: 16},
    { x: 8, y: 4, value: 16},
    { x: 8, y: 5, value: 16},
    { x: 8, y: 6, value: 16},
    { x: 8, y: 7, value: 16},
    { x: 8, y: 8, value: 16},
    { x: 8, y: 9, value: 15},
    { x: 8, y: 10, value: 15},
    { x: 8, y: 11, value: 15},
    { x: 8, y: 12, value: 15},
    { x: 8, y: 13, value: 15},
    { x: 8, y: 14, value: 15},
    { x: 8, y: 15, value: 15},
    { x: 8, y: 16, value: 5},
    { x: 8, y: 17, value: 5},
    { x: 8, y: 18, value: 5},
    { x: 8, y: 19, value: 1},
    { x: 8, y: 20, value: 4},
    { x: 8, y: 21, value: 4},
    { x: 8, y: 22, value: 60},

    { x: 9, y: 0, value: 11},
    { x: 9, y: 1, value: 12},
    { x: 9, y: 2, value: 13},
    { x: 9, y: 3, value: 13},
    { x: 9, y: 4, value: 13},
    { x: 9, y: 5, value: 13},
    { x: 9, y: 6, value: 13},
    { x: 9, y: 7, value: 13},
    { x: 9, y: 8, value: 13},
    { x: 9, y: 9, value: 14},
    { x: 9, y: 10, value: 14},
    { x: 9, y: 11, value: 5},
    { x: 9, y: 12, value: 5},
    { x: 9, y: 13, value: 5},
    { x: 9, y: 14, value: 5},
    { x: 9, y: 15, value: 5},
    { x: 9, y: 16, value: 10},
    { x: 9, y: 17, value: 10},
    { x: 9, y: 18, value: 3},
    { x: 9, y: 19, value: 1},
    { x: 9, y: 20, value: 4},
    { x: 9, y: 21, value: 1},
    { x: 9, y: 22, value: 60},

    { x: 10, y: 0, value: 13},
    { x: 10, y: 1, value: 13},
    { x: 10, y: 2, value: 9},
    { x: 10, y: 3, value: 10},
    { x: 10, y: 4, value: 9},
    { x: 10, y: 5, value: 10},
    { x: 10, y: 6, value: 10},
    { x: 10, y: 7, value: 10},
    { x: 10, y: 8, value: 9},
    { x: 10, y: 9, value: 6},
    { x: 10, y: 10, value: 6},
    { x: 10, y: 11, value: 7},
    { x: 10, y: 12, value: 8},
    { x: 10, y: 13, value: 9},
    { x: 10, y: 14, value: 10},
    { x: 10, y: 15, value: 4},
    { x: 10, y: 16, value: 4},
    { x: 10, y: 17, value: 4},
    { x: 10, y: 18, value: 4},
    { x: 10, y: 19, value: 4},
    { x: 10, y: 20, value: 4},
    { x: 10, y: 21, value: 4},
    { x: 10, y: 22, value: 60},

    { x: 11, y: 0, value: 5},
    { x: 11, y: 1, value: 6},
    { x: 11, y: 2, value: 7},
    { x: 11, y: 3, value: 8},
    { x: 11, y: 4, value: 9},
    { x: 11, y: 5, value: 4},
    { x: 11, y: 6, value: 4},
    { x: 11, y: 7, value: 4},
    { x: 11, y: 8, value: 4},
    { x: 11, y: 9, value: 21},
    { x: 11, y: 10, value: 4},
    { x: 11, y: 11, value: 4},
    { x: 11, y: 12, value: 4},
    { x: 11, y: 13, value: 2},
    { x: 11, y: 14, value: 21},
    { x: 11, y: 15, value: 2},
    { x: 11, y: 16, value: 2},
    { x: 11, y: 17, value: 24},
    { x: 11, y: 18, value: 3},
    { x: 11, y: 19, value: 4},
    { x: 11, y: 20, value: 4},
    { x: 11, y: 21, value: 27},
    { x: 11, y: 22, value: 70},
    
  ],    
  legend: [
    { minValue: -2, maxValue: -1, color: '#5721AE' }, 
    { minValue: 0, maxValue: 4, color: '#435caf' }, 
    { minValue: 5, maxValue: 10, color: '#8cd67a' }, 
    { minValue: 11, maxValue: 15, color: '#eed323' }, 
    { minValue: 16, maxValue: 20, color: '#ca8c3b' }, 
    { minValue: 21, maxValue: 25, color: '#D50101' }, 
    { minValue: 26, maxValue: 50, color: '#770000' },
  ],
  seabedDepth: 51,
 },
 height: 300
}

/* const tripleSeriesData = {
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
          "label": "Month One",
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
      },
      {
        "label": "Monthly Two",
        "values": [
          43.512526270079995,
            60.917536778111995,
            98.2540915776,
            34.810021016064,
            25.26533783424,
            34.810021016064,
            84.21779278079998,
            43.512526270079995,
            60.917536778111995,
            42.10889639039999,
            113.13256830220797,
            42.10889639039999,
            60.917536778111995
        ]
    },
    {
      "label": "Monthly Three",
      "values": [
          43.512526270079995,
          60.917536778111995,
          48.2540915776,
          34.810021016064,
          25.26533783424,
          34.810021016064,
          74.21779278079998,
          43.512526270079995,
          20.917536778111995,
          42.10889639039999,
          13.13256830220797,
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
 */
export const SingleSeriesGraph: Story = {
  args: {
    data: data,
    height: 400
  },
  render: () => {
    return (
      <div style={{ width: "60vw"}}>
        <HeatMapComponent data={data} height={400} />
      </div>
    );
  }
};

/* export const DoubleSeriesGraph: Story = {
  args: {
    data: data,
    height: 300
  },
  render: () => {
    return (
      <div style={{ width: "50vw"}}>
        <HeatMapComponent
          height={300}
         data={{
          ...data,
          series: [{
            label: "Month",
            values: newSeriesValues
          },{
            label: data.series[0].label,
            values: data.series[0].values
          }]}} 
          />
      </div>
    );
  }
}; */

/* 
export const TripleSeriesGraph: Story = {
  args: {
    data: tripleSeriesData,
    height: 300
  },
  render: () => {
    return (
      <div style={{ width: "30vw"}}>
        <HeatMapComponent data={tripleSeriesData} height={300}/>
      </div>
    );
  }
};
 */
/* export const EmptySeriesGraph: Story = {
  args: {
    data: data,
    height: 300
  },
  render: () => {
    return (
      <div style={{ width: "40em"}}>
        <HeatMapComponent data={emptyGraphData()} height={300}/>
      </div>
    );
  }
};
 */