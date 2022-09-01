# Hello World

This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA).

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `hello-world` directory:

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

Navigate to the GraphQL Explorer in Brightspot by selecting the menu button, then 'GraphQL Explorer'. Select 'Hello World Endpoint' as your GraphQL Endpoint. Make sure the `message` field is checked in the query on the left pane. Run the query by pressing the Run button in the middle of the GraphQL Explorer page. You should see the message 'Hello, World!'.

## How everything works

Brightspot gives you the power to create endpoints and content with ease. You can do this both editorially and with JS Classes.

Navigate to `brightspot/src/examples/hello-world`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:

- `HelloWorldViewModel.ts`: the class that contains logic requirements needed for the view (the frontend application)
  - getter functions determine what fields will be included in the schema.
- `HelloWorldEndpoint.ts`: the class that creates a custom Content Delivery Endpoint with the following configurations:
  - `updateCorsConfiguration`: permit cross-origin resource sharing (CORS) to enable requests from localhost
  - `getAccessOption`: implicit access so an API key is not required
  - `getPaths`: specify the path(s) to send HTTP requests to (this path is added to `app/.env`)
  - `Singleton`: create a 'one and only' instance of the custom endpoint
  - `setQueryEntryFields`: use the View Model class to determine the schema for the custom endpoint

## Try it yourself

The following are suggestions for learning more about JS Classes and Brightspot:

1. Try changing the path and then check in Brightspot: navigate to `Admin`, `APIs`, and then your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!

2. Try changing the message that is returned from the GraphQL query.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
