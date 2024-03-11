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
  }
};

export const Large: Story = {
  args: {
    ...data.two,
  }
};

export const Small: Story = {
  args:{ 
    ...data.three,
}}