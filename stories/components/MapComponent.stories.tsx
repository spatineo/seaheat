import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { SeaheatFeatureType } from '../../src/types';

import { MapComponent } from '../../src/components/map/MapComponent';
import { WMSLayer } from '../../src/components/map/layer/WMSLayer';
import { XYZLayer } from '../../src/components/map/layer/XYZLayer';
import { LineStringArrowLayer } from '../../src/components/map/layer/LineStringArrowLayer';
import { SingleFeatureLayer } from '../../src/components/map/layer/SingleFeatureLayer';
import { ImageComponent } from '../../src/components/ImageComponent/ImageComponent';

const al = {
  height: 468,
  scale: 0.8,
  url: "https://paikkatieto.ymparisto.fi/arcgis/services/Velmukartta/Velmukartta/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.026format=image/png26layer=1",
  width: 90
}

async function fetchWMSCapabilities(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    return null;
  }
}

function parseWMSCapabilities(capabilitiesXml: string): Array<{ legendUrl: string | null | undefined; name: string | null | undefined; title: string | null | undefined }> {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(capabilitiesXml, "text/xml");

  const layers = Array.from(xmlDoc.querySelectorAll("Layer")).map(layer => ({
    name: layer.querySelector("Name")?.textContent,
    title: layer.querySelector("Title")?.textContent,
    legendUrl: layer.querySelector("LegendURL OnlineResource")?.getAttribute("xlink:href")
  }))
  return layers;
}

async function fetchAndParseWMSCapabilities(url: string): Promise<Array<{ legendUrl: string | null | undefined; name: string | null | undefined; title: string | null | undefined }>> {
  try {
    const capabilitiesXml = await fetchWMSCapabilities(url);
    if (!capabilitiesXml) {
      console.log("Failed to fetch WMS GetCapabilities.");
      return [];
    }
    return parseWMSCapabilities(capabilitiesXml);
  } catch (error) {
    console.error('Failed to fetch and parse WMS capabilities:', error);
    return [];
  }
}

const wmsGetCapabilitiesUrl = "https://ows.terrestris.de/osm/service?request=GetCapabilities&service=WMS";
const layers = await fetchAndParseWMSCapabilities(wmsGetCapabilitiesUrl);
console.log(layers.length > 0 && layers);

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
      <div style={{ width: '30em',  height: "30em"}}>
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
      <div style={{ width: '30em',  height: "30em"}}>
        <MapComponent view={defaultView}>
          <SingleFeatureLayer type={SeaheatFeatureType.FACILITY} location={helsinki} zIndex={100} />
          {layers.filter(l => l.legendUrl !== null && l.legendUrl !== undefined).map(l => (
          <ImageComponent key={l.name} url={l.legendUrl!} width={al.width} height={al.height} scale={al.scale} />
        ))}
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
      <div style={{ width: '40em',  height: "30em"}}>
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
      <div style={{ width: '30em',  height: "30em"}}>
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
      <div style={{ width: '30em',  height: "30em"}}>
        <MapComponent view={defaultView}>
          <WMSLayer layerInfo={layerInfo} zIndex={10} opacity={0.5} />
        </MapComponent>
      </div>
    );
  }
};
