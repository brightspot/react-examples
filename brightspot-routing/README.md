# Brightspot Routing

This example highlights how to use JS Classes, the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api), and Brightspot's URL features to control routing in a front-end application.

## What you will learn

1. How to auto-generate permalinks based on user input
2. How to query for content using `path` as a query variable with Brightspot's GraphQL API
3. How to route a [React](https://reactjs.org/) application based on redirects entered into Brightspot

## Related examples

- [App Routing](https://github.com/brightspot/react-examples)

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `brightspot-routing` directory:

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
yarn start
```

The front-end application will open automatically in the browser.

## Before using the example application: key principles of url routing

1. An item should only have one exact path (example: an article should not have multiple possible urls)
2. A URL should be hackable: you should be able to backtrack to get to different sections
3. A URL should have a consistent hierarchy for displaying content (example: `section/subsection/article`)

## Using the example application

The front-end application is a simple news website. Content consists of sections and articles.

Publish the following content in Brightspot:

1. **Sections**(s)
2. **Article**(s)

> **_Note_** Permalinks are automatically generated based off of the `name` (for Sections) and `headline` (for Articles) fields. They can be modified but they must be unique across all content types.

Navigate to your front-end application to see your content displayed!

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.

Navigate to `brightspot/src/examples/brightspot_routing`. This directory contains the JS Class files that are uploaded to Brightspot.

#### Points to note in the JS Class files:

- `ViewModel.Of(BrightspotRoutingEndpoint)`: `AllSectionsViewModel` and `AllArticlesViewModel` specify the `BrightspotRoutingEndpoint` which makes it possible to query for content without using a query variable.
- `DirectoryItem`: `Article.ts` and `Section.ts` will generate Java Classes that implement `DirectoryItem`. This enables the use of the `createPermalink()` method to automatically generate permalinks. It exposes the permalink and redirect data entered into the URLs widget on a content type's edit page. It also adds `path` as a query variable.
- `DirectoryDataViewModel`: This returns a list of a content type's permalink paths and whether each one is a redirect or not. The React app can use this information to handle redirects.

#### Points to note in the React application:

- Query for `path`: `Content.tsx` uses [React Router](https://reactrouter.com/en/main) to grab the URL parameter that is used for the `path` query variable which corresponds to the permalink in Brightspot. The `GetContent` query looks at both Sections and Articles, but because permalink paths are unique, Brightspot will only return at most a single object.

> **_Note_** [Apollo Client](https://www.apollographql.com/docs/react/) and [GraphQl Code Generator](https://www.the-guild.dev/graphql/codegen/docs/getting-started) are used to reduce the amount of code necessary to run the GraphQL queries.

- Handling Redirects - When the Brightspot GraphQL API is queried using a `path` variable that corresponds to a redirect, it will still return the matching content. `Content.tsx` utilizes this with React Router to navigate the application to the primary permalink for the content.

> **_Note_** This React app is set up for client side rendering and will not send HTTP 3xx status codes for redirects. Try server side rendering to enable 3xx status codes.

## Try it yourself

The following is a suggestion for learning more about routing with JS Classes and Brightspot:

1. Try adding additional permalinks, aliases, or redirects to a Section or Article in Brightspot through the URLs widget on the content edit page. Navigate to those paths by manually entering the URL into a browser.
2. In Brightspot, navigate to **Sites & Settings &rarr; Global &rarr; CMS &rarr; Advanced** and toggle the **Always Generate Permalinks** field and the **Single Generated Permalink** field. Experiment with how those affect permalink generation.

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
