import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DesignerView } from "../../src/app/views/DesignerView";
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { DragHandleIcon } from '@chakra-ui/icons';

const meta: Meta = {
  title: 'Components/DesignerView',
  component: DesignerView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: <DragHandleIcon />
  },
};