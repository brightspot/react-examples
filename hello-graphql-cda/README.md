# Brightspot with React and GraphQL

This example highlights how simple it is to use the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA).

## Using JS Classes

JS Classes make it possible to create and modify Brightspot CMS content with JavaScript (TypeScript).

Run the following commands in the `brightspot` directory (if there is already a `brightspot.json` file you can skip the `npx brightspot config server http://localhost/cms` command):

```
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download
npx brightspot types upload src
```

In this example, the following has been created with JS Classes:

- A CDA endpoint: note the endpoint is added to (`app/.env`) of the frontend application your frontend.
- A HelloWorld Class and HelloWorld View Model to publish content.

## Running the frontend application

In the `app` directory run the following command:

```
yarn && yarn start
```

The frontend application will open automatically in your browser.

## Publish CMS Content

Publish a Hello World item in the CMS. Either create a permalink for the HelloWorld item you create, or copy the HelloWorld content id found by clicking the three ellipses next to the PUBLISH button, then selecting `tools`, and then the `FOR DEVELOPERS` tab.

Input either the permalink or id in your frontend application to see your HelloWorld content.
