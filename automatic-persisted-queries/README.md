# Automatic Persisted Queries

With GraphQL, clients send queries to the server as HTTP requests that include the query string to execute. Unfortunately, the size of a query string can become quite large, which can negatively impact network performance.

To resolve this issue, Brightspot supports two types of [persisted](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/graphql-understanding-persisted-queries) queries: [automatic](https://www.apollographql.com/docs/apollo-server/performance/apq/) (APQ) and [static](https://www.apollographql.com/blog/apollo-client/persisted-graphql-queries/) (SPQ).

Persisted queries positively impact network performance in two ways:

1. By sending a smaller query string in the network request.
2. By enabling the use of the HTTP `GET` method for query network requests (since typically the query size is small enough to use `GET`), thus making it possible to [integrate with a CDN](https://www.apollographql.com/docs/apollo-server/performance/apq/#using-get-requests-with-apq-on-a-cdn) to serve requests.

This example demonstrates how to use APQs with Brightspot and [Apollo Client](https://www.apollographql.com/docs/react/), using [best practices](https://www.apollographql.com/docs/react/data/operation-best-practices/) for GraphQL queries. The example configuration also provides a mock CDN to highlight performance benefits possible with APQs.

## What you will learn

1. [Enable APQs in Brightspot](#1-enable-apqs-in-brightspot).
2. [Configure a front-end application to use APQs with Brightspot](#2-configure-a-front-end-application-to-use-apqs-with-brightspot).

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

### Install dependencies

Run the following command from the `automatic-persisted-queries/app` directory:

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

Run the following command to start up the front-end application:

```sh
yarn dev
```

## Using the example application

The front end is a [Next.js](https://nextjs.org/) application.

The UI displays an Aviation Alphabet Converter page (option to use either an input field or checkboxes to convert letters).

Both the text input and checkboxes run a GraphQL query to fetch data. Good query types implement best practices for queries. For details on implementation refer to the comments found in the `app/queries` directory.

The only configuration to do in Brightspot (optional) is to add a `cache-control` value in Brightspot. Navigate to: **&#x2630;** &rarr; **Admin** &rarr; **APIs** &rarr; **Endpoints** &rarr; **Aviation Alphabet Endpoint**. In the **Cache Control** field, enter `max-age=80000`. In the browser, trigger a network request. The Brightspot cache control field shows the `cache-control` value you entered in Brightspot.

## How everything works

#### 1. Enable APQs in Brightspot

1. Create a persisted query protocol instance:

- [CustomAPQProtocol.ts](brightspot/src/brightspot/example/automatic_persisted_queries/CustomAPQProtocol.ts): This persisted query protocol implements `AutomaticPersistedQueryProtocol`, which enables generating a persisted query extension (the hashed value of a query), and getting queries by hash. The custom protocol must provide the following methods:

  - `getSharedSecret`: This method sets a secret (the salt) to increase security - only clients that hash queries along with the respective salt are valid. Return an empty string if a salt isn't desired.

    ```typescript
    [`getSharedSecret()`](): string {
      return 'secret'
    }
    ```

  - `getHashAlgorithm`: Brightspot provides a `Sha256PersistedQueryHashAlgorithm` class for generating hashes of queries. You can also add a custom hash algorithm.

    ```typescript
    [`getHashAlgorithm()`](): AutomaticPersistedQueryHashAlgorithm {
        return new Sha256PersistedQueryHashAlgorithm()
    }
    ```

2. Define your query protocol in the [endpoint](brightspot/src/brightspot/example/automatic_persisted_queries/AviationAlphabetEndpoint.ts):

   ```typescript
   [`getPersistedQueryProtocol()`](): PersistedQueryProtocol {
       let CustomAPQProtocol = ClassFinder.getClass(
         'brightspot.example.automatic_persisted_queries.CustomAPQProtocol'
       )
     return new CustomAPQProtocol()
     }
   ```

> **_Note_** The following is optional - if you want to use a CDN, you will need to configure `cache-control` headers on the server side (Brightspot).

3. Add cache control headers to the [endpoint](brightspot/src/brightspot/example/automatic_persisted_queries/AviationAlphabetEndpoint.ts):

- `onCreate`: This method is available for every [view model](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/view-models#methods). You can use this method to retrieve or create additional content not included on the received model. The `cache-control` value comes from the `cacheControl` field set on the endpoint.

  ```typescript
    onCreate(response: ViewResponse) {
      super.onCreate(response)
      if (this.model.cacheControl) {
        response.addHeader('Cache-Control', this.model.cacheControl)
      }
    }
  ```

#### 2. Configure a front-end application to use APQs with Brightspot

1. Configure the front-end application to send APQ hashes:

- [client.ts](app/lib//client.ts): This file initializes an `ApolloClient` instance customized to add a salt defined in Brightspot. The hashing algorithm used must be the same as that defined in `CustomAPQProtocol.ts`. The Apollo Client implementation also is configured to send hashed queries as `GET` requests rather than the default `POST` request.

```typescript
const persistedQueriesLink = createPersistedQueryLink({
  generateHash: async (schema: DocumentNode) => {
    const secret = process.env.SECRET_KEY!
    const message = secret.concat(print(schema))
    const result = await sha256(message)
    return result
  },
  useGETForHashedQueries: true,
})
```

- [.env](app/.env):
  - `SECRET_KEY`: Salt set by the `CustomAPQProtocol`
  - `GRAPHQL_URL`: URL for the `AviationAlphabetEndpoint`GraphQL API endpoint
  - `NEXT_PUBLIC_HOST`: URL for the front-end application. This is used to make fetch requests using Next.js [API Routes](https://nextjs.org/docs/api-routes/introduction).

#### APQ requests in detail

You can view GraphQL Persisted Request Data by navigating to **&#x2630;** &rarr; **Developer** &rarr; **GraphQL Explorer** &rarr; , then selecting **Aviation Alphabet Endpoint** from the dropdown list. Select any fields you like in the left pane so that a query populates in the middle pane. Click on the gear icon in the top right corner, then select **Persisted Query Extension**. A popup appears with the POST Body and GET URL Path.

POST Body:

```json
{
  "query": "query MyQuery {\n  AviationAlphabetEndpoint {\n    codes {\n      a\n    }\n  }\n}",
  "extensions": {
    "persistedQuery": {
      "sha256Hash": "6e4a307f9abd3fcc0b84613c2b4a5387424d2390147ec1734ece6b6acb4cdd7d"
    }
  }
}
```

GET URL Path:

```sh
/graphql/delivery/apq?extensions=%7B%22persistedQuery%22%3A%7B%22sha256Hash%22%3A%226e4a307f9abd3fcc0b84613c2b4a5387424d2390147ec1734ece6b6acb4cdd7d%22%7D%7D
```

The client sends a hash of the query to execute, along with variables, as a `GET` request. If Brightspot recognizes the hash (since the request has been made before), it will execute the associated query and return the results. If it doesn't recognize the hash, Brightpost returns the following error:

```json
{
  "errors": [
    {
      "message": "PersistedQueryNotFound"
    }
  ]
}
```

The client will then send a HTTP `POST` request with the same hashed value along with the respective query (the `POST` Body shown above). Brightspot validates the hash, and then stores the query, processes the request, and returns the result.

Ideally, you want to avoid `POST` requests when possible, since a `POST` request using APQ actually decreases network performance (since two queries are sent instead of one).

#### Caching responses with a CDN

If you add a the cache control value in Brightspot, you notice that the new value displays in the UI, and that when the client makes a request for data it has requested previously, a cache HIT is made. This means the CDN used in this example had a copy of the data in it's storage and was able to return the data without the request needing to be made to the origin server.

A cache miss is when the cache does not contain the requested content. The execution time for cache hits is significantly less than data that is not cached.

Refer to MDN's [cache control documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) for more information on how to configure cache control for your application.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.
