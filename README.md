# SeaHeat

Staging version: [https://seaheat-staging.com/](https://seaheat-staging.com/)

## Architecture

The app is built on React + Redux and development is done with Vite + storybooks

Main architecture:
 - Client only
 - React + Redux + RTK
 - UI in Chakra
 - Storybooks for component development
 - Deployed on AWS via CDK

Development guidelines:
 - Components are implemented separately from redux store
 - Connected components are used to pick out data from redux store and passed as props

Automation:
 - Github actions redeploys the CDK project on commits to `main`

## Frontend Development

Running the development server: `npm run dev`

Running storyboks: `npm run storybook`

## Backend Development

Backend deployment is done using AWS Cloudformation via CDK code. The architecture is very simple: Cloudfront, Route 53, ACM certificate and an S3 bucket. 

Note that you need to build the application before working on the stacks. Also please note that a frontend developer almost never needs to work on this.

```shell
npm run build

cd cdk/
npm install
cdk synth
```

