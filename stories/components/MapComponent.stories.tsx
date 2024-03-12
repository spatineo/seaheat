import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { MapComponent } from '../../src/components/map/MapComponent';
import { WMSLayer } from '../../src/components/map/layer/WMSLayer';
import { XYZLayer } from '../../src/components/map/layer/XYZLayer';


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/MapComponent',
  component: MapComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof MapComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicMap: Story = {
  render: () => {
    return (
      <MapComponent>
      </MapComponent>
    );
  }
};

export const XYZBathymetryLayer: Story = {
  render: () => {
    return (
      <MapComponent>
        <XYZLayer url='https://tiles.emodnet-bathymetry.eu/2020/baselayer/web_mercator/{z}/{x}/{y}.png' zIndex={10} opacity={1} />
      </MapComponent>
    );
  }
};

export const WMSBathymetryLayer: Story = {
  render: () => {
    return (
      <MapComponent>
        <WMSLayer url='https://geo.vliz.be/geoserver/ows' layerName='MARSPEC:bathy_30s1' zIndex={10} opacity={0.5} />
      </MapComponent>
    );
  }
};
