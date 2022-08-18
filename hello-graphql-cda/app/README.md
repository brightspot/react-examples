# Brightspot with React and GraphQL

This example highlights how simple it is to use the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA). Simply create an endpoint (`brightspot/src/brightspot/example/hello_graphql_cda/HelloGraphqlEndpoint.ts`), and add the path for the endpoint to your frontend(`app/.env`).

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Follow the [instructions](../../README.md) for running the Brightspot instance.

Once the development server is running, CD into `hello-graphql-cda/app` and run the following commands:

```
yarn && yarn start
```

Navigate to `http://localhost:3000` in your browser to see the result.

## Publish CMS Content

Publish a Hello World item in the CMS. Enter the permalink generated when you publish the HelloWorld in your frontend application.
