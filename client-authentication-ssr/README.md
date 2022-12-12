# Client Authentication - SSR

This example demonstrates how to use JS Classes to securely use an API Key connected to a Brightspot GraphQL Endpoint with a Server Side Rendering approach.

## What you will learn

1. How to set the access options of a Brightspot GraphQL Endpoint to require an API key
2. How to create an API key and assign it to an endpoint
3. How to query the endpoint without revealing the API key using Next.js and server side rendering

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `client-authentication-ssr` directory:

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
yarn dev
```

The front-end application will open automatically in the browser.

## Using the example application

The front-end application displays **Fun Fact** content created in Brightspot. Publish at least one **Fun Fact** and navigate to the front-end app to see the content displayed.

## How everything works

First, `ClientAuthSsrEndpoint` uses the `getApiAccessOption` method to return a `new GraphQLApiAccessOptionExplicit()` which sets the endpoint to require an API key.

Next, `ClientAuthEndpointClient` uses the `afterSave` method to programmatically create an API key (clientSecret) and apply it to the `ClientAuthSsrEndpoint`.

> **_Note_** This example generates an API key based off of the name of the API Endpoint to make the example easier to run. The resulting key will always be the same unless the name of the API Endpoint file is changed. In a production environment, use more unique characters when generating the key.

Finally, the front-end Next.js app uses the `getServerSideProps` function to run the API call to the Brightspot GraphQL Endpoint on the server side. The API key is stored as an environment variable in the `.env` file and does not have `NEXT_PUBLIC` prepended, meaning it is not visible to the web browser.

#### Points to note in the JS Class files:

- `key.setValue()`: This ultimately sets the value of the API key and can be set to any string.
- `client.setEndpoints(endpoints)`: An API client can apply to multiple endpoints.
- `key.setClient(client)`: An API client can have multiple API keys.

#### Points to note in the Next.js application:

- `getServerSideProps`: The Next.js app uses this function to run the API call server side so that the API key is hidden from the web browser.

## Try it yourself

The following is a suggestion for learning more about client authentication with JS Classes and Brightspot:

1. Try adding a new API key to the Client Auth Csr Endpoint Client and update the environment variables to use the new key.

> **_Note_** If you make any changes to the JS classes be sure to save the changes in Brightspot at **Admin** &rarr; **APIs** &rarr; **Endpoints** &rarr; **Client Auth Ssr Endpoint** &rarr; **Save**

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
