# Hello World

This example demonstrates creating a GraphQL [Content Delivery API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/cda-guides) (CDA) endpoint to access content in a front-end application.

## What you will learn
1. [Programatically create a CDA endpoint.](#step-1-programatically-create-a-cda-endpoint)
1. [View GraphQL query response in Brightspot's GraphQL Explorer.](#step-2-view-graphql-query-response-in-brightspots-graphql-explorer)
1. [View CDA endpoint query response in a front-end application.](#step-3-view-cda-endpoint-query-response-in-a-front-end-application)
## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then run the following commands.

To upload JavaScript classes in Brightspot (http://localhost/cms):

```sh
cd hello-world/brightspot/
yarn
npx brightspot types download
npx brightspot types upload src
```

To run the front end:

```sh
cd hello-world/app/
yarn
yarn start
```

The front-end application will open automatically in the browser.

## How everything works

### Step 1. Programatically create a CDA endpoint

- [`HelloWorldViewModel.ts`](/hello-world/brightspot/src/brightspot/example/hello_world/HelloWorldViewModel.ts): Contains logic for generating the view (the front-end application). The getter functions determine which fields will be included in the schema.
- [`HelloWorldEndpoint.ts`](/hello-world/brightspot/src/brightspot/example/hello_world/HelloWorldEndpoint.ts): Creates a custom CDA Endpoint. It implements `Singleton` to specify that there is only one instance of this endpoint, and that it should be created automatically when the application loads. This class has the following methods:
  - `getPaths`: Specifies the target paths for sending HTTP requests.
  - `getQueryEntryFields`: Specifies the view-model class that drives the schema for the custom endpoint.
  - `updateCorsConfiguration`: Permits cross-origin resource sharing (CORS) to enable requests from localhost.
  - `getAccessOption`: Allows implicit access, so an API key is not required.

### Step 2. View GraphQL query response in Brightspot's GraphQL Explorer

In Brightspot, run the sample query by doing the following:

1. Navigate to the GraphQL Explorer in Brightspot by selecting  ☰ **> GraphQL Explorer**.
1. Select **Hello World Endpoint** as your GraphQL Endpoint. Make sure the **message** field is checked in the query on the left pane.
1. Run the query by clicking **Run** in the middle of the GraphQL Explorer page. You should see the message `Hello, World!`.

### Step 3. View CDA endpoint query response in a front-end application

- [`.env`](/hello-world/app/.env): This file contains the GraphQL endpoint URL used for sending APi requests to Brightspot.

## Try it yourself

The following are suggestions for learning more:

1. Try changing the path and then check in Brightspot. Navigate to **Admin > APIs**, and then to your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!
1. Try changing the message that is returned from the GraphQL query.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
