import type { Meta, StoryObj } from '@storybook/react';

import EchartsComponent from '../../src/components/Echarts/EchartsComponent';
import * as echarts from 'echarts';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Echarts',
  component: EchartsComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    option: { control: 'object' },
    height: { control: "number"}
  },
} satisfies Meta<typeof EchartsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const option: echarts.EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
};

export const ChartOne: Story = {
  args: {
    option,
    height: 500,
  },
};

/* export const Secondary: Story = {
  args: {
    label: 'secondary'
  },
};

export const Large: Story = {
  args: {
    label: 'large'
  },
};

export const Small: Story = {
  args: {
    label: 'small',
  },
};
 */