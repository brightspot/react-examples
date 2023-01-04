# Cors Configuration

This example will use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to generate a GraphQL Content Delivery API endpoint (CDA) to then connect to a front-end application and show how to easily manage and debug CORS issues in an app to streamline development and better secure production applications.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `cors-configuration` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front-end:

```
cd app
yarn
yarn start
```

The front-end application will open automatically in the browser.

## Using the example application

## How everything works

Navigate to `brightspot/src/examples/cors-configuration`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:

- `Example.ts`:

## Try it yourself

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
