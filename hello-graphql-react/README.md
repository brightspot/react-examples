# Brightspot with React and GraphQL

This example highlights how simple it is to use the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA).

## Using JS Classes

JS Classes make it possible to create and modify Brightspot CMS content with JavaScript (TypeScript).

Run the following commands in the `brightspot` directory:

```
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download
npx brightspot types upload src
```

> **_Note_** If there is already a `brightspot.json` file you can skip the `npx brightspot config server http://localhost/cms` command.

In this example, the following is generated with JS Classes:

- A CDA endpoint: note the GraphQL endpoint is added to (`app/.env`) of the frontend application your frontend. This url is created in the JS Class `HelloGraphqlReactEndpoint.ts`.
- A HelloGraphqlReact Class and View Model to publish content.

## Running the frontend application

In the `app` directory run the following command:

```
yarn && yarn start
```

The frontend application will open automatically in your browser.

## Publish CMS Content

Publish a Hello GraphQL React item in the CMS. Either create a permalink for the item you create, or copy the id found by clicking the three ellipses next to the `PUBLISH` button, then selecting `tools`, and then the `FOR DEVELOPERS` tab.

Input either the permalink or id in your frontend application to see your published content.
