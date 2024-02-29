import type { Meta, StoryObj } from '@storybook/react';

import { ComponentInfo } from '../../src/components/ComponentInfo/ComponentInfo';

const meta = {
  title: 'Components/Info',
  component: ComponentInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position:  { control: 'array' },
    depth:  { control: 'text' },
    name: { control: 'number' },
    meters:  { control: 'text' },
  },
} satisfies Meta<typeof ComponentInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    position: [55.893856, 19.051956],
    depth: - 25,
    name: "Salmisaari - intake 1",
    meters: "m"
  },
};

export const Secondary: Story = {
  args: {
   ...Primary.args,
   depth: -45,
   name: "Salmisaari - intake 2"
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    depth: -35,
    name: "Salmisaari - intake 3"
  },
};