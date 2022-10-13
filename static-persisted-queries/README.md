# Static Persisted Queries (SPQ)
This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to implement static persisted queries in a front-end application.

## What you will learn
1. How to generate a whitelist of allowed queries based on all queries in the front-end application
2. How to set up a GraphQL endpoint in Brightspot that:
    - checks for a whitelist sent via a Content Management API (CMA) endpoint based on the app version
    - allows queries based on the version whitelist
3. How to create a front-end application with [React](https://reactjs.org/), [GraphQl Code Generator](https://www.the-guild.dev/graphql/codegen/docs/getting-started), and [Apollo Client](https://www.apollographql.com/docs/react/) that uses static persisted queries powered by Brightspot

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `static-persisted-queries` directory:

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
yarn codegen
yarn mapping
yarn start
```

The front-end application will open automatically in the browser.

## Using the example application
The front-end application displays the **SpqItem** created in Brightspot. 

In Brightspot, first publish an **SpqItem**:

**title**: Brightspot
**body**: Static Persisted Queries

Next, navigate to **Admin** => **APIs**, then select **Spq Endpoint**. You should see a list of Spq Protocols, with only version 0.1.0 listed. This list shows all of the whitelists that have been uploaded to Brightspot based on the front-end application version (found in `app/package.json`). The version whitelist is automatically used when you run the `yarn mapping` command.

View your front-end application in the browser. The GraphQL query should have resulted in successfully fetching your **SpqItem** data since the server recognizes the hash for the associated query string. 

## How everything works
JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.
Navigate to `brightspot/src/examples/static_persisted_queries`. This directory contains the JS Class files that are uploaded to Brightspot.

#### Points to note in JS Classes files:
- `getPersistedQueryProtocol`: this function in `SpqEndpoint.ts` enables persisted queries for the endpoint. The function identifies the version passed in the `X-App-Version` request header field, and queries for the `SpqProtocol` class that has the same version.
- `SpqProtocol.ts`: this class contains the `spqMappingFile` and the front-end application version number sent from the front-end using the CMA endpoint found in `MappingEndpoint.ts`.  

#### Points to note in the front-end application:
- `codegen.yml`: In addition to running Codegen to generate code from your GraphQL schema and GraphQL operations, running `yarn codegen` also creates a whitelist (`app/persisted-query-ids/server.json`) of SHA-256 hashes and their respective query strings.
- `updateMapping.mjs`: this file is run using the script `yarn mapping`. When you run the `yarn mapping` script, you make a POST request to the MappingEndpoint (`brightspot/src/brightspot/example/static_persisted_queries/MappingEndpoint.ts`) to create or update an **SpqProtocol** item. If the version whitelist does not exist, a new whitelist will be created in Brightspot identical to the whitelist in the front-end (`app/persisted-query-ids/server.json`).

## Try it yourself
The following are suggestions for learning more about static persisted queries with JS Classes and Brightspot:

1. Change the query found in `app/src/queries/GetSpqItem.graphql` by removing the body. 

```graphql
query GetSpqItem($title: String) {
  SpqItem(model: { title: $title }) {
    title
  }
}
```

Then run `yarn codegen`. In `app/src/App.tsx` comment out the `h2` element that displays the body so the front-end application doesn't throw an error. 

```jsx
 <h2>{data?.SpqItem?.body}</h2> // comment this line out
```

Now run `yarn start`. You should see the error message `Error: PersistedQueryNotSupported`. 

Stop the application and the run `yarn mapping`. Now restart the application (`yarn start`). You should see your **SpqItem** display in the browser (without the `body` field).

2. Stop the front-end application. Change the version number from `0.1.0` to `0.2.0` in `app/package.json`. Start the application again. You should see the error message `Error: PersistedQueryNotSupported`. Stop the application and run `yarn mapping`. Restart the application. You should see your **SpqItem** display in the browser.

> **_Note_** Currently if you use a version that does not have an associated whitelist in Brightspot no SPQ Protocol will be set, which means Brightpsot will allow all valid queries. In the near future an API key will also be used for queries to check the API key if a whitelist does not exist. 

## Troubleshooting
Refer to the [Common Issues](/README.md) section in the respository README for assistance.