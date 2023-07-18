# Hello World

This example highlights using JavaScript classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API  (CDA) endpoint to then connecting to a front-end application.

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

## Using the example application

In Brightspot, run the sample query by doing the following:

1. Navigate to the GraphQL Explorer in Brightspot by selecting  ☰ **> GraphQL Explorer**.
1. Select **Hello World Endpoint** as your GraphQL Endpoint. Make sure the **message** field is checked in the query on the left pane.
1. Run the query by clicking **Run** in the middle of the GraphQL Explorer page. You should see the message `Hello, World!`.

## How everything works

You can create endpoints and assets using the provided JavaScript classes.

Navigate to `brightspot/src/brightspot/example/hello-world/`. This directory contains the JavaScript class files that are uploaded to Brightspot.


### JavaScript class files

- `HelloWorldViewModel.ts`: Contains logic for generating the view (the front-end application). The getter functions determine which fields will be included in the schema.
- `HelloWorldEndpoint.ts`: Creates a custom Content Delivery Endpoint. It implements `Singleton` to specify that there is only one instance of this endpoint, and that it should be created automatically when the application loads. This class has the following methods:
  - `getPaths`: Specifies the target paths for sending HTTP requests (this path is added to `app/.env`).
  - `getQueryEntryFields`: Specifies the view-model class that drives the schema for the custom endpoint.
  - `updateCorsConfiguration`: Permits cross-origin resource sharing (CORS) to enable requests from localhost.
  - `getAccessOption`: Allows implicit access, so an API key is not required.

## Try it yourself

The following are suggestions for learning more about JavaScript classes and Brightspot:

1. Try changing the path and then check in Brightspot. Navigate to **Admin > APIs**, and then to your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!
1. Try changing the message that is returned from the GraphQL query.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
