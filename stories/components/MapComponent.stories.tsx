import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SeaheatFeatureType } from '../../src/types';


import { MapComponent } from '../../src/components/map/MapComponent';
import { WMSLayer } from '../../src/components/map/layer/WMSLayer';
import { XYZLayer } from '../../src/components/map/layer/XYZLayer';
import { LineStringArrowLayer } from '../../src/components/map/layer/LineStringArrowLayer';
import { SingleFeatureLayer } from '../../src/components/map/layer/SingleFeatureLayer';


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

const defaultView = {
  center: [2749287.033361, 8966980.662191],
  zoom: 5,
}

export const BasicMap: Story = {
  args: {
    view: defaultView
  },
  render: () => {
    return (
      <div style={{ width: '30em'}}>
        <MapComponent view={defaultView}>
        </MapComponent>
      </div>
    );
  }
};

const helsinki = [2775919.5947884205, 8437859.080046114];

export const HelsinkiFeature: Story = {
  args: {
    view: defaultView
  },
  render: () => {
    return (
      <div style={{ width: '30em'}}>
        <MapComponent view={defaultView}>
          <SingleFeatureLayer type={SeaheatFeatureType.FACILITY} location={helsinki} zIndex={100} />
        </MapComponent>
      </div>
    );
  }
};

const tallinn = [2756562.904182179, 8274187.302783563]

export const ArrowHelsinkiTallinn: Story = {
  args: {
    view: defaultView
  },
  render: () => {
    return (
      <div style={{ width: '30em'}}>
        <MapComponent view={{ center: [(helsinki[0]+tallinn[0])/2, (helsinki[1]+tallinn[1])/2], zoom: 8 }} onClickFeature={(evt) => console.log(evt)}>
          <LineStringArrowLayer lineString={[helsinki, tallinn]} zIndex={100} />
        </MapComponent>
      </div>
    );
  }
};

export const XYZBathymetryLayer: Story = {
  args: {
    view: defaultView
  },
  render: () => {
    return (
      <div style={{ width: '30em'}}>
        <MapComponent view={defaultView}>
          <XYZLayer url='https://tiles.emodnet-bathymetry.eu/2020/baselayer/web_mercator/{z}/{x}/{y}.png' zIndex={10} opacity={1} />
        </MapComponent>
      </div>
    );
  }
};

export const WMSBathymetryLayer: Story = {
  args: {
    view: defaultView
  },
  render: () => {
    const layerInfo = {
      id: 'xx',
      layer: {
        Name: 'MARSPEC:bathy_30s1',
        Title: 'Foo',
        Layer: []
      },
      url: 'https://geo.vliz.be/geoserver/ows'
    }
    return (
      <div style={{ width: '30em'}}>
        <MapComponent view={defaultView}>
          <WMSLayer layerInfo={layerInfo} zIndex={10} opacity={0.5} />
        </MapComponent>
      </div>
    );
  }
};
