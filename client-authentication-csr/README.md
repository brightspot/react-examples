# Client Authentication - CSR

Previous examples, like [Content Delivery](https://github.com/brightspot/react-examples/tree/main/content-delivery), create a GraphQL endpoint that is open, allowing any user or application to access it. When developing an API, it is important to decide which users or applications are allowed to access an endpoint.

A common way to control access to an API endpoint is through the implementation of API keys. Brightspot makes it possible to create and manage API keys for GraphQL endpoints through its API Client system.

This example demonstrates how to create a Brightspot GraphQL endpoint that requires an API Key for access. It also shows how to create an API Client, API Key, and how to fetch data from the secured endpoint using [Next.js](https://nextjs.org/) and [client side rendering](https://nextjs.org/docs/basic-features/data-fetching/client-side) without revealing the API key.

## What you will learn

1. How to set the access option of a Brightspot GraphQL Endpoint to require an API Key.
2. How to create an API Client and assign an endpoint to it.
3. How to create an API Key and assign it to an API Client.
4. How to query the endpoint without revealing the API key using Next.js and client side rendering.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `client-authentication-csr` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src
```

To run the front-end, run the following commands from the `client-authentication-csr/app` directory:

```sh
yarn
yarn dev
```

The front-end application will open automatically in the browser.

## Using the example application

The front-end application displays **Fun Fact** content created in Brightspot. Publish at least one **Fun Fact** and navigate to the front-end app to see the content displayed.

To show how the application responds to an incorrect API key, modify the `GRAPHQL_CLIENT_SECRET` value in the `.env` file located at `client-authentication-csr/app` to some new value. Then restart the Next.js application and navigate to it in your web browser.

## How everything works

1. The access option on the GraphQL endpoint is set to explicit, thereby requiring an API key to request data from it.

```ts
export default class ClientAuthCsrEndpoint extends JavaClass(
  'brightspot.example.client_authentication_csr.ClientAuthCsrEndpoint',
  ContentDeliveryApiEndpointV1,
  Singleton
) {
  // ...

  getApiAccessOption(): GraphQLApiAccessOption {
    return new GraphQLApiAccessOptionExplicit()
  }
}
```

2. The API Client is created using a [Modification](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/modifications) of the endpoint. The modification implements the `afterSave()` method which ensures that the code is run every time the original endpoint is saved.

```ts
export default class ClientAuthApiClient extends JavaClass(
  'brightspot.example.client_authentication_csr.ClientAuthApiClient',
  Modification.Of(ClientAuthCsrEndpoint)
) {
  afterSave(): void {
    // create an API Client and API Key here
  }
}
```

3. Before a new API Client is created, it first checks to see if a matching API Client already exists. This prevents duplicate API Clients from being created. If no matching API Client is found then a new one is created using `new ApiClient()`. Then the client is checked to see if the original endpoint has already been added to its list of endpoints. If not, the original endpoint is added using `client.setEndpoints()`.

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

4. First, a value for the API Key is defined in the `clientSecret` variable. Then it checks to see if a matching API Key already exists to prevent duplicates. If no matching API Key is found then a new one is created using `new ApiKey()`. Then the new key's value is set using the previously defined `clientSecret` before it is saved.

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

> **_Note_** The client secret used in this example is arbitrary. Brightspot recommends using a unique, random, and non-guessable value in production environments. The value can also be hidden away using environment variables.

5. From here, the GraphQL Endpoint is set up and can only be accessed by including the value of the API Key in a header attached to the request made to the endpoint. The Next.js application stores the value of the API Key in the `.env` file as an environment variable. The Next.js application uses [Apollo Client](https://www.apollographql.com/docs/react/get-started) to handle requests to the Brightspot GraphQL Endpoint and is defined in the `client.ts` file. The API Key is added to the request headers of the Apollo Client as `X-Client-ID` and `X-Client-Secret`. The Apollo Client is imported only into the [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) so that the API Key remains hidden from the web browser. When a request comes in to the `funFacts` API route, it requests data from the Brightspot GraphQL endpoint and returns the data in a response.

`app/.env`

```
GRAPHQL_URL=http://localhost/graphql/delivery/client-authentication-csr
GRAPHQL_CLIENT_ID=afffc6fd7d8733df862d9299bdac8044
GRAPHQL_CLIENT_SECRET=abcdefghijklmnopqrstuvwxyz0123456789
```

`app/lib/client.ts`

```ts
export const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.GRAPHQL_URL,
    headers: {
      'X-Client-ID': process.env.GRAPHQL_CLIENT_ID,
      'X-Client-Secret': process.env.GRAPHQL_CLIENT_SECRET,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
})
```

`app/pages/api/funFacts.ts`

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

6. The `index.tsx` component makes a request to the `funFacts` API route with the `useEffect` hook to get the data needed to generate the component's HTML.

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

1. Try adding a second API key to the Client Auth API Client and update the environment variables to use the new key.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
