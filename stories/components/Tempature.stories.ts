import type { Meta, StoryObj } from '@storybook/react';

import { TemperatureComponent } from "../../src/components/TemperatureComponent/TemperatureComponent";

const meta = {
  title: 'Components/Temperature',
  component: TemperatureComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tempatureValues: { control: 'array' },
  },
} satisfies Meta<typeof TemperatureComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const arg =  [
  { color: '#671bcd', value: '< 0°C' },
  { color: '#285db3', value: '0 - 4°C' },
  { color: '#64d96e', value: '5 - 10°C' },
  { color: '#f7d147', value: '11 - 15°C' },
  { color: '#e48b32', value: '16 - 20°C' },
  { color: '#e43222', value: '21 - 25°C' },
  { color: '#80170e', value: '> 25°C' },
  { color: '#666666', value: 'No Data' },
]

export const Primary: Story = {
  args: {
    tempatureValues: arg,
  },
  
};

export const Secondary: Story = {
  args: {
    tempatureValues: [
      {
        color: 'red',
        value: '< 0'
      },
      {
        color: 'blue',
        value: '1 - 5'
      },
      {
        color: 'green',
        value: '6 - 10'
      },
      {
        color: 'yellow',
        value: '11 - 15'
      },
      {
        color: 'purple',
        value: '16 - 20'
      },
      {
        color: 'brown',
        value: '21 - 25'
      },
      {
        color: 'black',
        value: '> 25'
      },
      {
        color: 'grey',
        value: 'No Data'
      }
    ]
  },
};

export const Large: Story = {
  args: {
    ...Primary.args
  },
};