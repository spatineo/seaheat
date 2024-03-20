import type { Meta, StoryObj } from '@storybook/react';
import { UploadView } from "../../src/app/views/UploadView";


const meta: Meta = {
  title: 'Components/UploadView',
  component: UploadView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};