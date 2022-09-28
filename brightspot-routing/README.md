# Brightspot Routing

This example highlights how to use JS Classes, the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api), and Brightspot's URL features to control routing in a front-end application.

## What you will learn

1. How to auto-generate permalinks based on user input.
2. How to query for content using `path` as a query variable with Brightspot's GraphQL API.
3. How to redirect a [React](https://reactjs.org/) application based on redirects entered into Brightspot.

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

## Before using the example application: key principles of good url routing

1. An item should only have one exact path (example: an article should not have multiple possible urls)
2. A URL should be hackable: you should be able to backtrack to get to different sections
3. A URL should have a consistent hierarchy for displaying content (example: `section/subsection/article`)

### URL routing for this application

- `/section/article`

> **_Note_** The above url structure is a basic example! URL structure is something that must be carefully designed to fit the needs of your application. This example is designed to show the building blocks available. You can build off of this basic structure to create various complex routing designs.

## Using the example application

The front-end application is a simple news website. Content consists of sections and articles.

Publish the following content in Brightspot:

1. **Sections**(s)
2. **Article**(s)

> **_Note_** Permalinks are automatically generated based off of the `name` (for Sections) and `headline` (for Articles) fields. They can be modified but they must be unique across all content types.

Navigate to your front-end application to see your content displayed!

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.

Navigate to `brightspot/src/examples/brightspot_routing`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### Points to note in the JS Class files:

- `ViewModel.Of(BrightspotRoutingEndpoint)`: `SectionsViewModel` and `ArticlesViewModel` specify the `BrightspotRoutingEndpoint` which makes it possible to query for content without a query variable.
- `DirectoryItem`: `Article.ts` and `Section.ts` will generate a Java Class that implements `DirectoryItem`. This enables the use of the `createPermalink()` method to automatically generate permalinks.
- `url` and `beforeSave()`: `Article.ts` and `Section.ts` use a unique, required, and read only `url` field combined with a `beforeSave()` function call to require every article and section to have a permalink before it can be published.

```js
  @JavaField(String)
  @Indexed({ unique: true })
  @Required
  @ReadOnly
  url?: string

  beforeSave(): void {
    this.url = this.getPermalink()
  }
```

#### Points to note in the React application:

- Query for `path`: `Section.tsx` and `Article.tsx` use [React Router](https://reactrouter.com/en/main) to grab the URL parameter that is used for the `path` query variable which corresponds to the permalink in Brightspot.

```js
const { section } = useParams()

const { data, error, loading } = useGetSectionQuery({
  variables: {
    path: section,
  },
})
```

> **_Note_** [Apollo Client](https://www.apollographql.com/docs/react/) and [GraphQl Code Generator](https://www.the-guild.dev/graphql/codegen/docs/getting-started) are used to reduce the amount of code necessary to run the GraphQL queries.

- Handling Redirects - When the Brightspot GraphQL API is queried using a `path` variable that corresponds to a redirect, it will still return the matching content. `Section.tsx` and `Article.tsx` utilize this to redirect the React application to primary permalink for the content.

```js
const { section } = useParams()
const navigate = useNavigate()

if (data.Section.path?.slice(1) !== section) {
  navigate(`${data.Section.path}`)
}
```

## Try it yourself

The following is a suggestion for learning more about routing with JS Classes and Brightspot:

1. Try adding additional permalinks, aliases, or redirects to a Section or Article in Brightspot. Navigate to those paths by manually entering in the URL into a browser.

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
