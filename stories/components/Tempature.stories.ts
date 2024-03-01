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
    //tempatureValues: { control: 'array' },
  },
} satisfies Meta<typeof TemperatureComponent>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
    axes: {
      x: {
        label: 'Month',
        values: ['Jan', 'Feb', 'Mar']
      },
      y: {
        label: 'Depth',
        values: ['0m', '-10m', '-20m']
      }
    },
    data: [{ x: 'Jan', y: '0m', value: 10 }, { x: 'Jan', y: '-10m', value: 8 }],
    legend: [{ minValue: 10, maxValue: 14, color: '#443388' }],
    seabedDepth: -51
   },
};

export const Large: Story = {
  args: {
    ...Primary.args
  },
};