# Client Authentication - CSR

Previous examples, like [Content Delivery](https://github.com/brightspot/react-examples/tree/main/content-delivery), create a GraphQL endpoint that is open, allowing any user or application to access it. When developing an API, it is important to decide which users or applications are allowed to access an endpoint.

A common way to control access to an API endpoint is through the implementation of API keys. Brightspot makes it possible to create and manage API keys for GraphQL endpoints through its API Client system.

This example demonstrates how to create a GraphQL endpoint that requires an API Key for access. It also shows how to create an API Client, API Key, and how to fetch data from the secured endpoint using [Next.js](https://nextjs.org/) and [client side rendering](https://nextjs.org/docs/basic-features/data-fetching/client-side) without revealing the API key.

## What you will learn

1. [Restrict access to the endpoint.](#1-restrict-access-to-the-endpoint)
2. [Create an API Client and assign the endpoint to it.](#2-create-an-api-client-and-assign-the-endpoint-to-it)
3. [Create an API Key and assign it to the API Client.](#3-create-an-api-key-and-assign-it-to-the-api-client)
4. [Query the endpoint without revealing the API Key.](#4-query-the-endpoint-without-revealing-the-api-key)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

Run the following commands from the `client-authentication-csr/app` directory:

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

To show how the application responds to an incorrect API Key, modify the `GRAPHQL_CLIENT_SECRET` value in the `.env` file located at `client-authentication-csr/app` to some new value. Then restart the Next.js app and navigate to it in your web browser.

## How everything works

### 1. Restrict access to the endpoint

An endpoint can be made to require an API Key by implementing the `getApiAccessOption()` method and returning a new instance of the `GraphQLApiAccessOptionExplicit()` class.

```ts
getApiAccessOption(): GraphQLApiAccessOption {
  return new GraphQLApiAccessOptionExplicit()
}
```

### 2. Create an API Client and assign the endpoint to it

An API Client stores a list of API Keys and applies to a list of endpoints. This example creates an API Client using a [Modification](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/modifications) of the endpoint class. The modification allows it to link the creation of the API Client and API Key(s) to the creation of the endpoint itself through the use of the `afterSave()` method.

Within the `afterSave()` method, the code first checks to see if a matching API Client already exists to prevent duplicates from being created. If no matching API Client is found then a new one is created. Then the client is checked to see if the original endpoint has already been added to its list of endpoints. If not, the original endpoint is added using the `setEndpoints()` method.

```ts
afterSave(): void {
  let original = this.getOriginalObject()

  let name = original.getClass().getName()
  let displayName = original.getState().getType().getDisplayName()
  let clientId = UuidUtils.createVersion3Uuid(name)

  let client = Query.findById(ApiClient.class, clientId)
  if (client === null) {
    client = new ApiClient()
    client.getState().setId(clientId)
    client.setName(displayName + ' Client')
  }

  if (!client.getEndpoints().contains(this)) {
    let endpoints = new ArrayList<ApiEndpoint>(client.getEndpoints())
    endpoints.add(original)

    client.setEndpoints(endpoints)
    client.saveImmediately()
  }

  // create API key here
}
```

### 3. Create an API Key and assign it to the API Client.

Within the same `afterSave()` method, an API Key is defined and assigned to the API Client. The code checks to see if a matching API Key already exists to prevent duplicates. If no matching API Key is found then a new one is created. Then the new key's value is set to any string value.

> **_Note_** The value of the API Key used in this example is arbitrary. Brightspot recommends using a unique, random, and non-guessable value in production environments. The value can also be hidden away using environment variables.

```ts
afterSave(): void {
  // ...

  let clientSecret = 'abcdefghijklmnopqrstuvwxyz0123456789'

  let key = Query.from(ApiKey.class)
    .where('value = ?', clientSecret)
    .or('value = ? && cms.content.trashed = ?', clientSecret, true)
    .first()

  if (key === null) {
    key = new ApiKey()
    key.setClient(client)
    key.setName(displayName + ' Key')
    key.setValue(clientSecret)
    key.setCreatedOn(new JavaDate())
    key.saveImmediately()
  }
}
```

### 4. Query the endpoint without revealing the API Key

The GraphQL endpoint checks each HTTP request for an `X-Client-Secret` header and compares its value to the API Keys associated with the endpoint. If the header is missing or incorrect it returns a 401 Unauthorized response.

There are many ways to hide API Keys from client side applications. This example uses [Apollo Client](https://www.apollographql.com/docs/react/get-started) and [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) to fetch data using client side rendering.

The Apollo Client is defined to include headers for the Client ID and Client Secret and is only imported into files within a Next.js server side API Route to keep the key hidden. Then during run time, the `index.tsx` component makes a request to this API Route allowing it to get data without having access to the API key.

[.env](./app/.env)

```
GRAPHQL_CLIENT_ID=afffc6fd7d8733df862d9299bdac8044
GRAPHQL_CLIENT_SECRET=abcdefghijklmnopqrstuvwxyz0123456789
```

[client.ts](./app/lib/client.ts)

```ts
export const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.GRAPHQL_URL,
    headers: {
      'X-Client-ID': process.env.GRAPHQL_CLIENT_ID,
      'X-Client-Secret': process.env.GRAPHQL_CLIENT_SECRET,
    },
  }),
})
```

[api/funFacts.ts](./app/pages/api/funFacts.ts)

```ts
import { client } from '../../lib/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  const { data, errors } = await client.query({
    query: GetAllFunFactsQuery,
  })

  // handle errors...

  res.status(200).json(data)
}
```

[index.tsx](./app/pages/index.tsx)

```ts
useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_HOST}/api/funFacts`)
    .then((res) => res.json())
    .then((res) => {
      setData(res)
      setLoading(false)
    })
}, [])
```

## Try it yourself

The following is a suggestion for learning more about client authentication with JS Classes and Brightspot:

- Consider a case where an endpoint is used by more than one front end application. Try adding a second API key to the API Client and update the environment variables to use the new key.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
