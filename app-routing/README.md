# App Routing

By default, you can query for content using [Brightspot's GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) using the `id` [GraphQL query argument](#graphql-query-arguments). 

You can also use the `path` query argument (which are permalinks in Brightspot) if content implements `Directory.Item`. Refer to [Brightspot Routing](https://github.com/brightspot/react-examples) for an example using Brightspot's system for generating permalinks and managing URLs, redirects, and more.

However, you might not want to utilize `id`, or have specific customization requirements that make Brightspot's predefined permalink system unsuitable. 

That is why Brightspot also gives you the ability to customize [GraphQL query arguments](#graphql-query-arguments) to be any unique content identifier.

This example uses [dynamic segments](#dynamic-segments) for [client-side routing](https://reactrouter.com/en/main/start/overview#client-side-routing) in a front-end [React](https://react.dev/) application. This examples uses [URL slugs](#url-slug) as GraphQL query arguments that are unique URL paths for requesting content data.

## What you will learn

1. [Create content with customized GraphQL query arguments in Brightspot.](#1-Create-content-with-customized-GraphQL-query-arguments-in-Brightspot)
2. [Create a client-side routing structure using GraphQL query arguments.](#2-Create-a-client-side-routing-structure-using-GraphQL-query-arguments)

## Related examples

- [Brightspot Routing](https://github.com/brightspot/react-examples)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

Run the following commands from the `brightspot-routing/app` directory:

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

### Generate types

```sh
$ yarn codegen
```

```
✔ Parse Configuration
❯ Generate outputs
  ❯ Generate ./src/generated.ts
✔ Parse Configuration
✔ Generate outputs
✨ Done in 2.05s.
```

### Start the React app

```sh
$ yarn start
```

```
Compiled successfully!
```

The React app opens automatically in the browser.

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Using the example application

The front-end application is a simple news website. Content consists of sections, tags, and articles.

Publish the following content in Brightspot:

1. **Sections**(s)
2. **Tag**(s)
3. **Article**(s)

Navigate to your front-end application to see your content displayed.

## How everything works

### 1. Create content with customized GraphQL query arguments in Brightspot

To make a field available as a query input field in GraphQL, add the Indexed annotation to the content class in Brightspot, making sure to only allow unique values: `@Indexed({ unique: true })`.

[Article.ts](./brightspot/src/brightspot/example/app_routing/Article.ts)
```typescript
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string
```

### 2. Create a client-side routing structure using GraphQL query arguments

Use the indexed query input field as a unique parameter (identifier) in GraphQL queries in the front-end application.

[Article.tsx](`./app/src/components/Article.tsx):

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

Similar structure is also used in `src/components/Section.tsx` and `src/commponents/Tag.tsx`.

The routing structure with React Router for this application is: 

[index.tsx](`./app/src/index.tsx)

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

Segments of a URL as dynamic placeholders, like parameters in a function.

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

The last part of the URL address that acts as a unique identifier for a webpage.

```javascript
/// unique-url-slug is the URL slug
'https://example.com/unique-url-slug/'
```

#### GraphQL query arguments

A set of key-value pairs attached to a specific field. Arguments are passed into the server-side execution of the respective field, and affect how the field is resolved. Arguments can be literal values or variables (refer to [GraphQL query variables](#graphql-query-variables)).

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

A GraphQL query is like a function, to which you can provide dynamic arguments. These dynamic arguments are query variables.

```javascript
query GetArticle($slug: String) { // variable definition ($slug: String)
  Article(model: { slug: $slug }) { // GraphQL argument using variable
    body
    headline
    publishDate
  }
}
```

Refer to [GraphQl documentation](https://graphql.org/learn/queries/#variables) for more information.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
