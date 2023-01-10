# Introspection Query Management

This example demonstrates how to use JavaScript Classes to disable [GraphQL Introspection Queries](https://graphql.org/learn/introspection/) from public use while still allowing the build pipeline to generate types using [GraphQL Code Generator](https://www.the-guild.dev/graphql/codegen).

## What you will learn

1. How to create an introspection query rule and apply it to a GraphQL endpoint.
2. How to define an introspection key.
3. How to pass an introspection key along with a GraphQL Code Generator introspection query.
4. How to allow introspection queries from the Brightspot GraphQL Explorer.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `brightspot-routing` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src
```

To run the front end:

```sh
cd app
yarn
yarn codegen
yarn start
```

The front-end application opens automatically in the browser.

## Using the example application

The front-end application displays **Song** content created in Brightspot. Publish at least one **Song** and navigate to the front-end application to see the content displayed.

> **_Note_** The GraphQL API call does not include any API keys or forms of validation because the endpoint is completely open to the public.

Run the command `yarn codegen` in the `app` directory to locally run an introspection query. This query runs successfully because it passes an **Introspection-Key** header along with the request.

To confirm that introspection queries do not work without the correct header, either change the `INTROSPECTION_KEY` value in the `app/.env` file or change the value of the `Introspection Key` field on the **Introspection Query Management Endpoint** (**Navigation Menu** &rarr; **Admin** &rarr; **APIs** &rarr; **Endpoints** &rarr; **Introspection Query Management**).

You can also use a third party GraphQL explorer like [Hasura](https://cloud.hasura.io/public/graphiql?endpoint=http%3A%2F%2Flocalhost%2Fgraphql%2Fdelivery%2Fintrospection-query-management) to simulate an external introspection query. The query produces an error unless the correct **Introspection-Key** is included as a header in the request.

## How everything works

1. The `IntrospectionQueryManagementEndpoint` stores a String field named `introspectionKey` which represents the key that is used to validate introspection queries.

2. The `IntrospectionQueryManagementEndpoint` implements the `getIntrospectionQueryRule` method which returns a new `ExampleIntrospectionQueryRule` with an `introspectionKey` that matches the key from the endpoint.

3. The `ExampleIntrospectionQueryRule` implements the `isAllowed()` method which returns `true` if the introspection query has an introspection key header that matches the actual introspection key, or if the introspection query is coming from Brightspot's internal GraphQL Explorer. All other introspection queries are blocked.

The end result is a GraphQL API that is open to the public but with introspection queries available only to internal developers. This provides a layer of security by obscurity.

Read more about [why you should disable GraphQL introspection in production](https://www.apollographql.com/blog/graphql/security/why-you-should-disable-graphql-introspection-in-production/).

#### Points to note in the JS Class files:

- `this.introspectionKey = 'abcdefghijklmnopqrstuvwxyz'`: This sets a default value for the introspection key when the endpoint is first created. The default value in this example is for demonstration purposes. Brightspot recommends using a more unique and secure value in production environments.
- `request.as(GraphQLApiRequest.class).isExplorerQuery()`: This method only refers to queries made through Brightspot's GraphQL Explorer.
- `request.getHeader('Introspection-Key')`: Any non-reserved header name can be used. This example is for demonstration purposes.

#### Points to note in the React application:

- `codegen.yml`: The headers used in the GraphQL Code Generator can be edited in this file.
- `queries/AllSongs.graphql`: Only the fields listed in this query will be public to users. All other fields on the `Song` content type are available but hidden.

## Try it yourself

The following is a suggestion for learning more about GraphQL introspection with JS Classes and Brightspot:

1. Try changing the name of the introspection key header. You will need to make changes to multiple files.
2. Try changing the introspection query rule to only allow introspection from Brightspot's GraphQL Explorer.

> **_Note_** If you make any changes to the JS classes, be sure to save the changes in Brightspot at **Admin** &rarr; **APIs** &rarr; **Endpoints** &rarr; **Introspection Query Management** &rarr; **Save**

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
