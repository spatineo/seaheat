import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { GraphComponent } from '../../src/components/GraphComponent/GraphComponent';
import { emptyGraphData } from '../../src/types'


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

export const SingleSeriesGraph: Story = {
  args: {
    optionData: data,

  },
  render: () => {
    return (
      <div style={{ width: "30em"}}>
        <GraphComponent optionData={data} />
      </div>
    );
  }
};

export const DoubleSeriesGraph: Story = {
  args: {
    optionData: data,
  },
  render: () => {
    return (
      <div style={{ width: "50vw", height: "5em"}}>
        <GraphComponent optionData={{
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
};


export const EmptySeriesGraph: Story = {
  args: {
    optionData: data,
   
  },
  render: () => {
    return (
      <div style={{ width: "40em"}}>
        <GraphComponent optionData={emptyGraphData()}/>
      </div>
    );
  }
};
