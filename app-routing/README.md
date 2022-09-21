# App Routing
This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to add dynamic routing in a front-end application. This example demonstrates how to use a slugs as query variables.

## What you will learn
1. How to query for Content using fields other than `id` with GraphQL through Brightspot's platform (`slug`, etc)
2. How to set up a GraphQL endpoint in Brightspot that can:
    - check content types based on `id` or other specified field
    - display fields for other specified content
3. How to create a front-end application with [React](https://reactjs.org/), [Apollo Client](https://www.apollographql.com/docs/react/), [GraphQl Code Generator](https://www.the-guild.dev/graphql/codegen/docs/getting-started), and [React Router](https://reactrouter.com/en/main) to display provided by Brightspot
## Related examples
- [Brightspot Routing](https://github.com/brightspot/react-examples)  
## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `hello-world` directory:

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

## Before using the example application: key principles of good url routing
1. An item should only have one exact path (example: an article should not have multiple possible urls)
2. A url should be hackable: you should be able to backtrack to get to different sections
3. A url should have a consistent heirarchy for displaying content (example: `section/subsection/article`) 

### Url routing for this application
- `/tag`
- `/section/child-section/child-section`
- `/section/article`

> **_Note_** The above url structure is a basic example! URL structure is something that must be carefully designed to fit the needs of your application. This example is designed to show the building blocks available. You can build off of this basic structure to create various complex routing designs. 
## Using the example application
The front-end application is a simple news website. Content consists of pages, tags, and articles.

Publish the following content in Brightspot:

1. **Sections**(s)
2. **Article**(s)
3. **Tag**(s)

> **_Note_** When choosing a slug, avoid spaces, slashes and non-ASCII characters. It is also best to use the same case for all letters. An example of a good slug: `my-example-page`. An example of a bad slug: `my Example/page`. 

Navigate to your front-end application to see your content displayed!

## How everything works
JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.
Navigate to `brightspot/src/examples/app_routing`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### Points to note in JS Classes files:
- `ViewModel.Of(AppRoutingEndpoint)`: specifying the `AppRoutingEndpoint` makes it possible to query for Content without a query variable
- `PageEntryView`: adding `PageEntryView` to the List of query entry fields for `AppRoutingEndpoint` make those query fields available using the `AppRoutingEndpoint`. All View Models that implement the `PageEntryView` interface will display as fields under the `PageEntry` field in GraphQL Explorer.

#### Points to note in the front-end application:
- `DynamicContainer.tsx`: this component uses the `PageEntry` entry field to verify the Content type. The resulting component that is displayed is determined by checking the typename returned by GraphQL. This makes it possible to use the following route for both a **Section** and **Tag**:

(`app/src/index.tsx`):
```js
    <Route path=":content" element={<DynamicContainer />} />
```

- In `app/src/List.tsx` the Link always uses the path with the **Section** as the first part of the path, even when the List is used from `Tag.tsx`. This ensures that the url for the **Article** is always the same (`section/article`). 
## Try it yourself

The following is a suggestion for learning more about app routing with JS Classes and Brightspot:

1. Try changing parts of the url. Verify the path returns the `NotFound` page if any of the path is incorrect.

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to updated the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.