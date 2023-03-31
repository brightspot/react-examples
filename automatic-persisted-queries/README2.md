# Automatic Persisted Queries

This example demonstrates using [Apollo Client](https://www.apollographql.com/docs/react/) to query a Brightspot [Content Delivery API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/cda-guides) (CDA) endpoint using [Automatic Persisted Queries](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/graphql-understanding-persisted-queries) in a [Next.js](https://nextjs.org/) application. Brightspot makes it possible to add a custom key ([salt](https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/)) to increase security for [automatic persisted queries](https://www.apollographql.com/docs/apollo-server/performance/apq/).

## Setup

- Refer to the core repository [README](/README.md) for general setup
- cd into `brightspot`
- Run `yarn`, then `npx brightspot types download`, then `npx brightspot types upload src`
- cd into `app`
- Run `yarn`, then `yarn dev`

## About the application

The front-end application displays an Aviation Alphabet Converter page. You can convert regular alphabet letters to their aviation alphabet (otherwise known as [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet)) value either by inputting letters into the text field in the top card, or by checking the checkboxes in the bottom card.

Checking checkboxes or inputting text results in a query sent to the CDA endpoint to fetch data. By default, each card queries for data using [best practices](https://www.apollographql.com/docs/react/data/operation-best-practices/) for GraphQL queries. You can change the type of query (good/ bad) by selecting the query type in the top left corner of each card.

When you enter text or check checkboxes, the client makes a HTTP request to Brightspot using the `AviationsAlphabetEndpoint` CDA endpoint. When the client makes a request, either `GET` or `POST` displays at the top of each card, along with either `MISS from localhost` or `HIT from localhost` and the execution time in milliseconds. A `POST` query means Brightspot didn't find the APQ hash the client sent to Brightspot as a `GET` HTTP request, and the client had to resend the request as a `POST`. A `HIT` means the [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) set up for this example has confirmed it can serve the result from it's cache and the cache contains the associated data for the request.

In addition, when the client makes a network request, if set, Brightspot will send a [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) response header. This value displays just below the page title in the front-end application. By default, there is no `Cache-Control` header. To add the header and value, in Brightspot navigate to: **Navigation Menu** &rarr; **Admin** &rarr; **APIs** &rarr; **Endpoints** &rarr; **Aviation Alphabet Endpoint**. In the **Cache Control** field, enter `max-age=80000`. Then, in the browser, trigger a network request (check a checkbox or input text based on the input type selected). The Brightspot cache control field shows the `cache-control` value you entered in Brightspot.

## Key files

- [CustomAPQProtocol.ts](brightspot/src/brightspot/example/automatic_persisted_queries/CustomAPQProtocol.ts): Persisted Query Protocol for endpoint.
- [AviationAlphabetEndpoint.ts](brightspot/src/brightspot/example/automatic_persisted_queries/AviationAlphabetEndpoint.ts): Where the persisted query protocol is set.
- [AviationAlphabetEndpointViewModel.ts](brightspot/src/brightspot/example/automatic_persisted_queries/AviationAlphabetEndpointViewModel.ts): Adds a cache control header.
- [client.ts](app/lib//client.ts): Where the Custom Apollo client instance is created.
- [GetCheckboxesBad.tsx](app/queries/GetCheckboxesBad.tsx): A bad query example using dynamic query strings.
- [GetCheckboxesGood.tsx](app/queries/GetCheckboxesGood.tsx): a good query example using a static query string.
- [GetTextBad.tsx](app/queries/GetCheckboxesBad.tsx): A bad query example using hard coded query argument values.
- [GetTextGood.tsx](app/queries/GetCheckboxesGood.tsx): a good query example using GraphQL variables.
- [.env](app/.env): contains salt set in Brightspot, Brightspot CDA URL, and URL for making API requests.
