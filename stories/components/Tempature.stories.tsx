import type { Meta, StoryObj } from '@storybook/react';
import { TemperatureComponent } from "../../src/components/TemperatureComponent/TemperatureComponent";
import { data } from './Temperature.data';
import { Box, ChakraProvider } from "@chakra-ui/react";
import React from 'react'

const meta = {
  title: 'Components/Temperature',
  component: TemperatureComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  render: (args) => (
    <ChakraProvider>
      <Box>
        <TemperatureComponent {...args} />
      </Box>
    </ChakraProvider> 
  ),
} satisfies Meta<typeof TemperatureComponent>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
   ...data.one,
  }
};


export const WideBox: Story = {
  args: {
   ...data.one,
  },
  render: (args) => (
    <ChakraProvider>
      <Box width={'800px'}>
        <TemperatureComponent {...args} />
      </Box>
    </ChakraProvider> 
  ),
};


export const NarrowBox: Story = {
  args: {
   ...data.one,
  },
  render: (args) => (
    <ChakraProvider>
      <Box width={'300px'}>
        <TemperatureComponent {...args} />
      </Box>
    </ChakraProvider> 
  ),
};


/*
export const Large: Story = {
  args: {
    ...data.two,
  }
};

export const Small: Story = {
  args:{ 
    ...data.three,
}}
*/