# SeaHeat

Staging version: [https://seaheat-staging.com/](https://seaheat-staging.com/)

## Architecture

This app is built on React + Redux and development is done with Vite + storybooks. The app is only a front-end with no backend. The backend discussed in this document relates to deployment of the frontend in AWS.

Main architecture:
 - React + Redux + Redux toolkit
 - Typescript
 - UI in Chakra v2
 - Storybooks for component development
 - Deployed on AWS via CDK

Development guidelines:
 - Components are implemented separately from redux store
 - Connected components are used to pick out data from redux store and passed as props
 - Non-connected components can be developed stand-alone without the application using (https://storybook.js.org/)[storybooks]

Automation:
 - Github actions redeploys the CDK project to the staging environment on commits to `main`

## Frontend Development

Using the supplied devcontainer is recommended so to use a standardized version of Node and NPM. However it is not mandatory. Also note that the devcontainer contains Spatineo specific configuration for AWS that you might want to change to reflect your deployment should you want to further develop this.

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

## Backend Development

Backend deployment is done using AWS Cloudformation via CDK code. The architecture is very simple: Cloudfront, Route 53, ACM certificate and an S3 bucket. 

Note that you need to build the application before working on the stacks. Also please note that a frontend developer almost never needs to work on this.

```shell
npm run build

cd cdk/
npm install
cdk synth
```

