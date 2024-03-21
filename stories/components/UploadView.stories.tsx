import type { Meta, StoryObj } from '@storybook/react';
import { UploadView } from "../../src/app/views/UploadView";

const processfile = (file: File) => {
    console.log('Processing uploaded file in story')
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
        if (fileReader.result === null) {
          console.error('filereader.result === null')
            return;
        }
        try {
            const storedState = JSON.parse(String(fileReader.result))
            console.log('THIS IS THE CONTENTS OF THE UPLOADED FILE', storedState)
        } catch(e) {
          console.error('Unable to read file', e)
        }
    }
    fileReader.readAsText(file);
}

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
    onChange: processfile,
    accept: 'application/json',
    buttonText: 'Import',
    dragDropText: 'Drag and Drop'
  },
};