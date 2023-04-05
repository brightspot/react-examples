# Automatic Persisted Queries

With GraphQL, clients send queries to the server as HTTP requests that include the query string to execute. Unfortunately, the size of a query string can become quite large, which can negatively impact network performance.

To resolve this issue, Brightspot supports supports two types of [persisted queries](#persisted-queries): [automatic](#automatic-persisted-queries-apq) (APQ) and [static](#static-persisted-queries-spq) (SPQ).

Persisted queries positively impact network performance in two ways: 

1. By sending a smaller query string in the network request (the hashed value of the query string).
2. By enabling the use of the HTTP `GET` method for query network requests (since typically the query size is small enough to use `GET`), thus making it possible to integrate with a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) to serve requests.  

Persisted queries can also improve security in two different ways (based on persisted query protocol):

1. Only allow whitelisted queries (SPQ)
2. Only allow queries that are corectly hashed with a designated [salt](#salt) that is validated in Brightspot (APQ)

This example demonstrates how to use APQs with Brightspot and [Apollo Client](https://www.apollographql.com/docs/react/).

## What you will learn

1. [Enable APQs in Brightspot with a salt](#1-enable-apqs-in-brightspot-with-a-salt).
2. [Caching query responses](#2-caching-query-responses).

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

The front end is a [Next.js](https://nextjs.org/) application that uses [API Routes](https://nextjs.org/docs/api-routes/introduction), which act as server-side application. With API Routes, you can keep sensitive environment variables (in this example, the salt) from being visible in the final client build.

The UI displays an Aviation Alphabet Converter page. You can convert regular alphabet letters to their aviation alphabet (otherwise known as [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet)) value either by inputting letters into the text field in the top card, or by checking the checkboxes in the bottom card. 

Both the text input and checkboxes run a GraphQL query to fetch data. By default, each card uses the query that implements [best practices](https://www.apollographql.com/docs/react/data/operation-best-practices/) for GraphQL queries - especially when it comes to APQs. You can change the type of query (good/ bad) by selecting the query type in the top left corner of each card. 

When you enter text or check checkboxes, the client makes a HTTP request to Brightspot using the `AviationsAlphabetEndpoint` GraphQL API endpoint. When the client makes a request, either `GET` or `POST` displays at the top of each card, along with either `MISS from localhost` or `HIT from localhost` and the execution time in milliseconds. A `POST` query means Brightspot didn't find the APQ hash the client sent to Brightspot as a `GET` HTTP request, and the client had to resend the request as a `POST`. A `HIT` means the CDN set up for this example has confirmed it can serve the result from it's cache and the cache contains the associated data for the request.

If a cache-control is set on the endpoint, Brightspot will send a `Cache-Control` response header when the client makes a network request. This value displays just below the page title in the front-end application.

#### APQ requests in detail

You can view GraphQL Persisted Request Data by navigating to  **&#x2630;** &rarr; **Developer** &rarr; **GraphQL Explorer** &rarr; , then selecting **Aviation Alphabet Endpoint** from the dropdown list. Select any fields you like in the left pane so that a query populates in the middle pane. Click on the gear icon in the top right corner, then select **Persisted Query Extension**. A popup appears with the POST Body and GET URL Path. 

```json
{
  "query" : "query MyQuery {\n\n  AviationAlphabetEndpoint {\n    codes {\n      a\n    }\n  }\n}",
  "extensions" : {
    "persistedQuery" : {
      "sha256Hash" : "5fa87a36c73180e50e3aeb00fad967ffd3ab65b98d79966b991e17fffd3f2184"
    }
  }
}
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

#### Caching responses and using a CDN

Up to this point, you may have noticed that all network requests result in a `MISS from localhost`, and the `Cache Control` field is empty. To set the cache control, in Brightspot navigate to:  **&#x2630;** &rarr; **Admin** &rarr; **APIs** &rarr; **Endpoints** &rarr; **Aviation Alphabet Endpoint**. In the **Cache Control** field, enter `max-age=80000`. In the browser, trigger a network request (check a checkbox or input text based on the input type selected). The Brightspot cache control field shows the `cache-control` value you entered in Brightspot. 

After updating the cache control, you notice that the new value displays in the UI, and that when the client makes a request for data it has requested previously, a cache HIT is made. This means the CDN used in this example had a copy of the data in it's storage and was able to return the data without the request needing to be made to the origin server. 

A cache miss is when the cache does not contain the requested content. The execution time for cache hits is significantly less than data that is not cached. 

Refer to MDN's [cache control documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) for more information on how to configure cache control for your application. 

## How everything works

#### 1. Enable APQs in Brightspot with a salt

  1. Create a Persisted Query Protocol instance:

  - [CustomAPQProtocol.ts](brightspot/src/brightspot/example/automatic_persisted_queries/CustomAPQProtocol.ts): This persisted query protocol implements `AutomaticPersistedQueryProtocol`, which enables generating a persisted query extension (the hashed value of a query), and getting queries by hash. The custom protocol must provide the following methods:

      - `getSharedSecret`: This method sets a secret (the salt) to increase security - only clients that hash queries along with the respective salt are valid. Return an empty string if a salt isn't desired.

        ```typescript
        [`getSharedSecret()`](): string {
          return 'secret'
        }
        ```

      - `getHashAlgorithm`: Brightspot provides a `Sha256PersistedQueryHashAlgorithm` class for generating hashes of queries. You can also  add a custom hash algorithm.

        ```typescript
        [`getHashAlgorithm()`](): AutomaticPersistedQueryHashAlgorithm {
            return new Sha256PersistedQueryHashAlgorithm()
        }
          ```

  2. Define your Query Protocol in the Brightspot GraphQL [endpoint](brightspot/src/brightspot/example/automatic_persisted_queries/AviationAlphabetEndpoint.ts) using your persisted query protocol instance:

        ```typescript
        [`getPersistedQueryProtocol()`](): PersistedQueryProtocol {
            let CustomAPQProtocol = ClassFinder.getClass(
              'brightspot.example.automatic_persisted_queries.CustomAPQProtocol'
            )
          return new CustomAPQProtocol()
          }
        ```
  3. Configure the front-end application to send APQ hashes:

  - [client.ts](app/lib//client.ts):  This file initializes an `ApolloClient` instance. This instance is customized to add a salt that Brightspot adds before hashing queries. In this implementation, SHA256 is used as the hashing alogrithm. Other hashing algorithms can be used, but they must be the same as the hashing algorithm defined in `CustomAPQProtocol.ts`. The Apollo Client implementation also is configured to send hashed queries as `GET` requests rather than the default `POST` request.

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
        - `GRAPHQL_URL`: URL for the `AviationAlphabetEndpoint`GraphQL API endpoint (set in `getPaths` method)
        - `NEXT_PUBLIC_HOST`: URL for the front-end application. This is used to make fetch requests using Next.js API Routes.   
  #### 2. Caching query responses

  Add cache control headers to the [endpoint](brightspot/src/brightspot/example/automatic_persisted_queries/AviationAlphabetEndpoint.ts):
      - `onCreate`: This method is available for every [view model](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/view-models#methods). You can use this method to retrieve or create additional content not included on the received model. In this example, the HTTP response header `cache-control` is added to send that header with each GraphQL response from the endpoint. The `cache-control` value comes from the `cacheControl` field set on the endpoint. 
    
      ```typescript
        onCreate(response: ViewResponse) {
          super.onCreate(response)
          if (this.model.cacheControl) {
            response.addHeader('Cache-Control', this.model.cacheControl)
          }
        }
      ```
### Key Terms

#### Persisted Queries
A query string that is cached on the server side, together with a unique identifier (a hash of the query string). A client application can send the identifier instead of the query string to the Brightspot GraphQL endpoint. If the endpoint recognizes the hash, it will execute the respective query and send the result to the client. When used correctly, persisted queries can reduce request sizes significantly.

#### Automatic Persisted Queries (APQ)
A type of persisted query where each unique query and its associated hash must be sent to the endpoint at least once. After any client sends a query string to persist, every client that executes that query can simply send the query hash and the endpoint will execute the respective query and send the result in a response to the client. 

#### Static Persisted Queries (SPQ)
A type of persisted query where each each unique query and its associated hash are predefined and registered with a Brightspot GraphQL API endpoint, and only those queries are allowed. 

#### Salt
Random data (string in this example) that is added to data that is then hashed. Salts are used to provide extra security for hashed information. 

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.