# Client Authentication - CSR

Previous examples, like [Content Delivery](https://github.com/brightspot/react-examples/tree/main/content-delivery), create a GraphQL endpoint that is open, allowing any user or application to access it. When developing an API, it is important to decide which users or applications are allowed to access an endpoint.

Brightspot supports API keys through its API Client system. This example demonstrates how to create a GraphQL endpoint that requires an API key and shows how to fetch data from it.

## What you will learn

1. [Restrict access to the endpoint.](#1-restrict-access-to-the-endpoint)
2. [Create an API Client and API Key.](#2-create-an-api-client-and-api-key)
3. [Query the endpoint.](#3-query-the-endpoint)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

Run the following commands from the `client-authentication/app` directory:

### Install dependencies

```sh
$ yarn
```

```
[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...
[4/4] 🔨 Building fresh packages...
✨ Done in 6.03s.
```

### Start the Next.js app

```sh
$ yarn dev
```

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

The front-end application will open automatically in the browser.

## Using the example application

The Next.js app makes a request to the GraphQL endpoint. The request includes headers that contain a secret API Key stored as an environment variable. If the value of the API Key in the headers match the value stored in Brightspot then the app will display the data returned.

To show how the application responds to an incorrect API Key, modify the `NEXT_PUBLIC_GRAPHQL_CLIENT_SECRET` value in the `.env` file located at `client-authentication/app` to some new value. Then restart the Next.js app and navigate to it in your web browser.

## How everything works

### 1. Restrict access to the endpoint

An endpoint can be made to require an API Key by implementing the `getApiAccessOption()` method and returning a new instance of the `GraphQLApiAccessOptionExplicit()` class.

```ts
getApiAccessOption(): GraphQLApiAccessOption {
  return new GraphQLApiAccessOptionExplicit()
}
```

### 2. Create an API Client and API Key

An an API Client can be created in Brightspot at **☰** &rarr; **Admin** &rarr; **APIs** &rarr; **Clients** &rarr; **New API Client**. The associated endpoints can be added to the `Endpoints` field and API keys can be managed through the `Keys` field.

TODO: **_Add image here_**

> **_Note_** This example uses an API Client that is pre-configured to work with the front-end application. It is best practice to create an API Client editorially in production environments.

### 3. Query the endpoint

The GraphQL endpoint checks each HTTP request for `X-Client-Id` and `X-Client-Secret` headers and compares the values to the endpoint's API Client and API keys. If the headers are missing or incorrect it returns a 401 Unauthorized response.

This example uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to send requests to the endpoint with the required headers. It is best practice to use a proxy server to make any HTTP requests that include the API key to keep it hidden from the public.

This example shows requests using both [Next.js Client-side rendering](https://nextjs.org/docs/basic-features/data-fetching/client-side) and [Next.js Server-side rendering](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props).

TODO: **_update link_**
[index.tsx](./app/pages/index.tsx)

```ts
// Client-side Rendering

useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_URL}`, {
    method: 'POST',
    headers: {
      'X-Client-Id': process.env.NEXT_PUBLIC_GRAPHQL_CLIENT_ID ?? '',
      'X-Client-Secret': process.env.NEXT_PUBLIC_GRAPHQL_CLIENT_SECRET ?? '',
      // WARNING: Secret key is exposed in web browser
    },
    body: JSON.stringify({
      query: getAllFunFactsQuery,
    }),
  })
}, [])
```

```ts
// Server-side Rendering

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.GRAPHQL_URL}`, {
    method: 'POST',
    headers: {
      'X-Client-Id': process.env.GRAPHQL_CLIENT_ID ?? '',
      'X-Client-Secret': process.env.GRAPHQL_CLIENT_SECRET ?? '',
    },
    body: JSON.stringify({
      query: getAllFunFactsQuery,
    }),
  })

  const data = await res.json()

  return { props: data }
}
```

## Try it yourself

TODO: **_update section_**

The following is a suggestion for learning more about client authentication with JS Classes and Brightspot:

- Consider a case where an endpoint is used by more than one front end application. Try adding a second API key to the API Client and update the environment variables to use the new key.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
