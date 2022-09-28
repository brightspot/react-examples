# Automatic Persisted Queries
This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to implement automatic persisted queries in a front-end application. This example demonstrates how to use a slugs as query variables.

## What you will learn
1. How to add a custom Hash Algorithm with JS Classes
2. How to set up a GraphQL endpoint in Brightspot that can:
    - use various hash algorithms for automatic persisted queries
    - add a secret key (salt) to increase security for automatic persisted queries
3. How to create a front-end application with [React](https://reactjs.org/), [Apollo Client](https://www.apollographql.com/docs/react/) that uses automatic persisted queries powered by Brightspot

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `hello-world` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front-end:

```sh
cd app
yarn
yarn start
```

The front-end application will open automatically in the browser.

## Using the example application
The front-end application is a simple card showing the **ApqItem** created in Brightspot. Three different hash algorithms are available: the default (SHA-256), SHA-512, and SHA-1.

In Brightspot, First, publish a **ApqItem**.
Next, navigate to Admin -> APIs, then select the Apq Endpoint. Select a Hash from the dropdown in the Apq Endpoint form. Click **SAVE**. Navigate to GraphQL Explorer by clicking the menu button on the top left, then selecting GraphQL Exploreer. Select Apq Endpoint from the dropdown menu, then query for the **ApqItem** you created using title for the query variable. After running the query, click on the cog button on the top right. Select Persisted Query Extension. You will see a POST Body like the following:

```json
{
  "query" : "query MyQuery {\n  ApqItem(model: {title: \"test\"}) {\n    body\n    title\n  }\n}",
  "extensions" : {
    "persistedQuery" : {
      "sha1Hash" : "b5c755588417c55f6e8e62b812e5db33f29101b8"
    }
  }
}
```
and a GET URL Path like the following:

```json
/graphql/delivery/apq?extensions=%7B%22persistedQuery%22%3A%7B%22sha1Hash%22%3A%22b5c755588417c55f6e8e62b812e5db33f29101b8%22%7D%7D
```
*****************TODO (down below)**********************************

> **_Note_** When choosing a slug, avoid spaces, slashes and non-ASCII characters. It is also best to use the same case for all letters. An example of a good slug: `my-example-page`. An example of a bad slug: `my Example/page`. 

Navigate to your front-end application to see your content displayed!

## How everything works
JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.
Navigate to `brightspot/src/examples/app_routing`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### Points to note in JS Classes files:
- `ViewModel.Of(AppRoutingEndpoint)`: specifying the `AppRoutingEndpoint` makes it possible to query for Content without a query variable
- `PageEntryView`: adding `PageEntryView` to the List of query entry fields for `AppRoutingEndpoint` make those query fields available using the `AppRoutingEndpoint`. All View Models that implement the `PageEntryView` interface will display as fields under the `PageEntry` field in GraphQL Explorer.

#### Points to note in the front-end application:
- `DynamicContainer.tsx`: this component uses the `PageEntry` entry field to verify the Content type. The resulting component that is displayed is determined by checking the typename returned by GraphQL. This makes it possible to use the following route for either an **Article**, a **Section** or a **Tag**:

(`app/src/index.tsx`):
```js
    <Route path=":content" element={<DynamicContainer />} />
```
## Try it yourself

The following is a suggestion for learning more about app routing with JS Classes and Brightspot:

1. Try changing parts of the url. Verify the path returns the `NotFound` page if any of the path is incorrect.

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to updated the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.