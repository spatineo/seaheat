# SeaHeat

Staging version: [https://seaheat-staging.com/](https://seaheat-staging.com/)

## Architecture

This app is built on React + Redux and development is done with Vite + storybooks. The app is only a front-end with no backend. The backend discussed in this document relates to deployment of the frontend in AWS.

Main architecture:
 - React + Redux + Redux toolkit
 - Typescript
 - UI in Chakra v2
 - Storybooks for component development
 - Deployable as a static website + JS code to any web server

Development guidelines:
 - Components are implemented separately from redux store
 - Connected components are used to pick out data from redux store and passed as props
 - Non-connected components can be developed stand-alone without the application using (https://storybook.js.org/)[storybooks]

Automation:
 - Github actions redeploys the CDK project to an AWS staging environment on commits to `main`

## General notes on frontend development

Using the supplied devcontainer is recommended so to use a standardized version of Node and NPM. However it is not mandatory. Also note that the devcontainer contains Spatineo specific configuration for AWS that you might want to change to reflect your deployment should you want to further develop this.

After cloning the repository, or if the dependencies have changed, run: `npm ci`

Running the development server: `npm run dev` access via http://localhost:5173/

Running storyboks: `npm run storybook`, access via http://localhost:6006/

### Guidance on state and export/import

Redux is used for state. The state includes both the configuration made by the user, data retrieved from servers, data calculated via the MathMiddleware. 

A major feature of the application is the ability to export and import state. This state only contains the configuration, not data from servers or calculated data. The export/import state file is JSON that contains the relevant parts of the Redux state in a wrapper object:

```json
{
    "application": "fmi-seaheat",
    "version": "0.1",
    "exportedAt": "2025-05-16T07:12:23.379Z",
    "state": /* redux state here */
}
```

Export/import is handled by middleware (`src/middleware/ImportExportMiddleware.ts`)

Each slice in `src/app/slices/` contains a restoreXXXState action that is used to get state from the export file and ingest that into current state. These functions should replace all state of that slice. Note that the data slice action does nothing as it is not supposed to get any state information from the import file.

Current implementation only supports a single version of the state export file, but the file includes a version field to help developers later on add backwards compatibility for export files from earlier versions of the software.

## The map

The map uses EPSG:3857 projection and has a fixed openstreetmap layer as background. Users can add a single data layer to the map and any number of overlays or custom layers on top. The map also shows the location of the intake, facility and discharge and the connections between these. The discharge location will also show the discharge impact area. All data shown on the map are implemented as layers. 


### OpenLayers + React

The map component uses OpenLayers. There is a main MapComponent component and layers are implemented as separate React components nested within the MapComponent. A context provider is used to pass the OpenLayers map reference to map sub-components (such as the layers).

For an overview of the current seaheat map implementation, see `src/app/connected/ConnectedMapComponent.tsx`.

The application contains a fixed set of WMS layers the user can choose to enable or disable on the map. These are identified via uuid identifiers in the state. Therefore exported state should work even if the WMS layer or address of the service is changed in the application, since the exported state only refers to the identifier. Custom WMS layers are separate since the state stores the address as well as layer name and title.

### Adding new layers

1. Create a new UUID identifier (for example: https://www.uuidgenerator.net/)
2. Edit `src/config/layers.ts` and add a new record to `availableLayers`:

```javascript
{
    id: "the-id-you-just-generated",
    title: "Title visible in the UI",
    capabilitiesUrl: "https://url.to/the/service?SERVICE=WMS&REQUEST=GetCapabilities",
    layer: "name-of-thelayer",
    isDatalayer: true, // true if you want this as a data layer, false for an overllay
    type: "WMS", // currenlty only WMS is supported
    dimensions: ["time", "depth"], // WMS layer dimensions you want to make usable for the user, or leave it out if no dimensions should be shown 
    legend: { // Optionally you can set a legend: an image that will be displayed on the map
        url: "https://location.of.the/legend/image/typically/copied/from/capabilities.jpg",
        width: 90, // original width and height of the source image
        height: 468,
        scale: 0.8 // any scaling factor that needs to be applied to the source image
    }
},
```

## How to create new graphs

The graphs in the bottom of the screen are calculated via the MathMiddleware. There is a specific slice for graph data and each graph follows the same data model. All graphs are set to empty data if the current application state does not include all data required for the calculation (including startup) 

Slice: `src/app/slices/data.ts`

Adding a new graph (roughtly):
- Add a new value for the `OutputType` enum (in the data slice)
- Set initialState for this type as `emptyGraphData()` (in the slice)
- Add an action to set the data for this graph (in the data slice)
- Give a visible title to the grapn in `src/config/graph.ts`
- Create a listener in `src/middleware/MathMiddleware.ts` that is executed whenever actions that affect the input data are fired 

## Backend Development

Backend deployment is done using AWS Cloudformation via CDK code. The architecture is very simple: Cloudfront, Route 53, ACM certificate and an S3 bucket. 

Note that you need to build the application before working on the stacks. Also please note that a frontend developer almost never needs to work on this.

```shell
npm run build

cd cdk/
npm install
cdk synth
```

