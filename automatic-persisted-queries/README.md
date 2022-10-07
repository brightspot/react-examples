# Automatic Persisted Queries (APQ)
This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to implement automatic persisted queries in a front-end application.

## What you will learn
1. How to add a custom Hash Algorithm with JS Classes
2. How to set up a GraphQL endpoint in Brightspot that can:
    - use various hash algorithms for automatic persisted queries
    - add a secret key (salt) to increase security for automatic persisted queries
3. How to create a front-end application with [React](https://reactjs.org/) and [Apollo Client](https://www.apollographql.com/docs/react/) that uses automatic persisted queries powered by Brightspot

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `automatic-persisted-queries` directory:

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
The front-end application displays the **ApqItem** created in Brightspot. Three different hash algorithms are available: the default (SHA-256), SHA-512, and SHA-1.

In Brightspot, first publish an **ApqItem**:

**title**: Brightspot
**body**: Automatic persisted queries

Next, navigate to **Admin** => **APIs**, then select **Apq Endpoint**. Select a hash from the dropdown in the **Apq Endpoint** form. Click **SAVE**. Navigate to **GraphQL Explorer** by clicking the menu button on the top left, then selecting **GraphQL Explorer**. Select **Apq Endpoint** from the dropdown menu, then query for the **ApqItem** you created using title for the query variable. After running the query, click on the cog button on the top right. Select **Persisted Query Extension**. You will see a **POST Body** like the following:

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
and a **GET URL Path** like the following:

```json
/graphql/delivery/apq?extensions=%7B%22persistedQuery%22%3A%7B%22sha1Hash%22%3A%22b5c755588417c55f6e8e62b812e5db33f29101b8%22%7D%7D
```

Navigate to your front-end application. Try selecting the different algorithms and observe the different results. 

## How everything works
JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.
Navigate to `brightspot/src/examples/automatic_persisted_queries`. This directory contains the JS Class files that are uploaded to Brightspot.

#### Points to note in JS Classes files:
- `getPersistedQueryProtocol`: this function in `ApqEndpoint.ts` enables automatic persisted queries for the endpoint. This function also determines the hash algorithm and secret (optional) 
- Custom Hash Algorithms: if a custom hash algorithm is not created, Brightspot will default to the `Sha256PersistedQueryHashAlgorithm` for automatic persisted queries 

#### Points to note in the front-end application:
- `createPersistedQueryLink`: Apollo Client makes it simple to implement automatic persisted queries on the client side. The default hashing algorithm is SHA-256. Refer to the Apollo Client documentation for further information. 

> **_Note_** This is purely an example application! In production, it is important to hide the secret that is hashed with the query.
 
## Try it yourself
The following is a suggestion for learning more about automatic persisted queries with JS Classes and Brightspot:

- Look at the network tab when sending new queries. To modify a query, simply change the query name after the `query` keyword in `app/src/GetItem.tsx`, then refresh the browser. Notice how the server and client respond. 

Example of changing query name:

```graphql
query hi($title: String) {
  ApqItem(model: {title: $title}) {
    title
    body
  }
}
```

Notice in the UI how the method changes to POST on the first render, then GET on further renders.

## Troubleshooting
Refer to the [Common Issues](/README.md) section in the respository README for assistance.