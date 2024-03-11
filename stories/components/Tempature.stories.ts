import type { Meta, StoryObj } from '@storybook/react';
import { TemperatureComponent } from "../../src/components/TemperatureComponent/TemperatureComponent";
import { data } from './Temperature.data';

const meta = {
  title: 'Components/Temperature',
  component: TemperatureComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TemperatureComponent>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
   ...data.one,
   location: [65.893856, 24.051956]
  }
};

export const Large: Story = {
  args: {
    ...data.two,
  location: [55.893856, 19.051956]
  }
};

export const Small: Story = {
  args:{ 
    ...data.three,
    location: [60.893856, 21.051956],
    legend: data.one.legend
}}