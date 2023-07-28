# App Routing

By default, you can query for content using [Brightspot's GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) using the `id` [GraphQL query argument](#graphql-query-arguments). 

You can also use the `path` query argument (which are permalinks in Brightspot) if a content type implements `Directory.Item`. Refer to [Brightspot Routing](../brightspot-routing/README.md) for an example of using Brightspot for generating permalinks, managing URLs and redirects, and more.

However, you might not want to utilize `id`, or have specific customization requirements that make Brightspot's predefined permalink system unsuitable. For such cases, Brightspot gives you the ability to customize [GraphQL query arguments](#graphql-query-arguments) to be any unique content identifier.

This example uses [dynamic segments](#dynamic-segments) for [client-side routing](https://reactrouter.com/en/main/start/overview#client-side-routing) in a front-end React application. The example uses [URL slugs](#url-slug) as GraphQL query arguments.

## What you will learn

1. [Create content with customized GraphQL query arguments in Brightspot.](#step-1-create-content-with-customized-graphql-query-arguments-in-brightspot)
1. [Create a client-side routing structure using GraphQL query arguments.](#step-2-create-a-client-side-routing-structure-using-graphql-query-arguments)

## Related examples

- [Brightspot Routing](../brightspot-routing/README.md)
## Running the example application

> **_Note:_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications.

Run the following commands from the `brightspot-routing/app/` directory:

### Install dependencies

```sh
yarn
```
Wait until a message similar to `✨ Done in 5.03s` appears.

### Generate types

```sh
yarn codegen
```

Wait until a message similar to `✨ Done in 2.03s` appears.

### Start the React app

```sh
yarn start
```
The React app opens automatically in the browser.

> **_Note:_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to update the `app/generated/` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Using the example application

The front-end application is a simple news website. Content consists of sections, tags, and articles.

To start, in Brightspot publish a few instances of the following content types:

- Sections
- Tags
- Articles

## How everything works

### Step 1. Create content with customized GraphQL query arguments in Brightspot

To make a field available as a query input field in GraphQL, add the `@Indexed({ unique: true })` annotation that ensures the field has unique values. The following example is in the file [Article.ts](./brightspot/src/brightspot/example/app_routing/Article.ts).

```typescript
@JavaField(String)
@Indexed({ unique: true })
@JavaRequired
slug: string
```

### Step 2. Create a client-side routing structure using GraphQL query arguments

Use the indexed query input field as a unique parameter (identifier) in GraphQL queries. The following example is in the file [Article.tsx](./app/src/components/Article.tsx).

```typescript
import { useGetArticleQuery } from '../generated'
import { Link, useParams } from 'react-router-dom'

const Article = () => {
  const { section, article } = useParams()
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      slug: article, // slug input field for Article determined by the parameter in the url
    },
  })
```

Similar structure is also used in  [Section.tsx](./app/src/components/Section.tsx) and [Tag.tsx](./app/src/components/Tag.tsx).

The routing structure for the React Router is in the file [index.tsx](./app/src/index.tsx).

```typescript
<ApolloProvider client={client}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="sections/:section" element={<Section />} />
        <Route path="sections/:section/:article" element={<Article />} />
        <Route path="tags/:tag" element={<Tag />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
</ApolloProvider>
```
## Key terms

#### Dynamic segments

Segments of a URL as dynamic placeholders, similar to parameters in a function.

```jsx
<Route path=":section/:article" element={<Article />} />
```

The segment with `:` is dynamic, and the value is determined as follows:

```jsx
// If current path is /arts/recent-trends
const Article = () => {
  // returned from `useParams`
  const params = useParams()
  params.section // arts
  Params.article // recent-trends
}
```

Refer to the [React Router Dynamic Segment documentation](https://reactrouter.com/en/main/start/overview#dynamic-segments) for more information.

#### URL slug

The last part of the URL that acts as a unique identifier for a webpage within a domain.

```javascript
/// unique-url-slug is the URL slug
'https://example.com/unique-url-slug/'
```

#### GraphQL query arguments

A set of key-value pairs attached to a specific field. Arguments are passed into the server-side execution of the respective field, affecting how the field is resolved. Arguments can be literal values or variables (refer to [GraphQL query variables](#graphql-query-variables)).

```javascript
query GetArticle($slug: String) {
  Article(model: { slug: "great-article" }) { // query argument with static value "great article"
    body
    headline
    publishDate
  }
}
```

#### GraphQL query variables

A GraphQL query is similar to a function to which you can provide dynamic arguments. These dynamic arguments are query variables.

```javascript
query GetArticle($slug: String) { // variable definition ($slug: String)
  Article(model: { slug: $slug }) { // GraphQL argument using variable
    body
    headline
    publishDate
  }
}
```

Refer to GraphQL's [Variables](https://graphql.org/learn/queries/#variables) for more information.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
