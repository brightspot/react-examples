# App Routing Example

By default, you can query for content using [Brightspot's GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) using the `id` [GraphQL query argument](#graphql-query-arguments). You can also use the `path` query argument (which are permalinks in Brightspot) if content implements `Directory.Item`. Refer to [Brightspot Routing](https://github.com/brightspot/react-examples) for an example using Brightspot's Permalink system.

However, with Brightspot, you can also customize the GraphQL query arguments to be any unique content identifier.

This example uses [dynamic segments](#dynamic-segmentss) for [client-side routing](https://reactrouter.com/en/main/start/overview#client-side-routing) in a front-end [React](https://react.dev/) application. [URL slugs](#url-slug) are the GraphQL query arguments used as unique URL paths to request content data.

## What you will learn

1. How to create content with customized GraphQL query arguments in Brightspot.
2. How to create a client-side routing structure with [React Router](https://reactrouter.com/en/main) that takes advantage of GraphQL query arguments and GraphQL [query variables](#graphql-query-variables) to fetch data in a front-end application.

## Related examples

- [Brightspot Routing](https://github.com/brightspot/react-examples)

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `app-routing` directory:

To upload JS Classes in Brightspot (http://localhost/cms) run the following commands:

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src
```

To run the front end, run the following commands from the `app-routing/app` directory:

```sh
yarn
yarn codegen
yarn start
```

The front-end application opens automatically in the browser.

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Before using the example application: Google recommendations for URL structure:

1. When possible, use readable words rather than long ID numbers:

```sh
✅ Recommended: https://www.example.com/search/docs
❌ Not recommended: https://www.example.com/search/doc-324aq90000jk
```

2. Use hyphens instead of underscores:

```sh
✅ Recommended: https://www.example.com/fitness-clothing
❌ Not recommended: https://www.example.com/fitness_clothing
```

3. Organize content so URLs are constructed logically and in a way that is easy for people to understand.

```sh
Example:  https://www.news.com/world/asia/japan/cherry-blossom-festival
```

4. Minimize the number of alternative URLs that return the same content to avoid search engines like Google making more requests to your site than needed.

For more guidelines on URL structure, refer to the following:

- [Google documentation on url structure](https://developers.google.com/search/docs/crawling-indexing/url-structure)
- [Google documentation on e-commerce url structure](https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites)

### URL routing for this application

- `/sections/<section>`
- `/tags/<tag>`
- `/sections/<section>/<article>`

## Using the example application

The front-end application is a simple news website. Content consists of sections, tags, and articles.

Publish the following content in Brightspot:

1. **Sections**(s)
2. **Tag**(s)
3. **Article**(s)

Navigate to your front-end application to see your content displayed.

## How everything works

The `brightspot/src/examples/app_routing` directory contains the JS Classes files uploaded to Brightspot:

1. `AllTagsViewModel.ts`:

- `ViewModel.Of(AppRoutingEndpoint)`: Extending a view model of `AppRoutingEndpoint` makes it possible to query for content without a query variable since `AppRoutingEndpoint` implements `Singleton`, ensuring the endpoint is the only one of its kind.

```typescript
@ViewInterface
export default class AllTagsViewModel extends JavaClass(
  'brightspot.example.app_routing.AllTagsViewModel',
  ViewModel.Of(AppRoutingEndpoint)
) {
```

This same pattern is also used in `AllArticlesViewModel.ts` and `AllSectionsViewModel.ts`.

2. `Article.ts`:

- `@Indexed({ unique: true })`: Using the Indexed annotation and setting unique to true makes a field available as a query input field in GraphQL.

```typescript
  @JavaField(String)
  @Indexed({ unique: true })
  @JavaRequired
  slug: string
```

This same pattern is also used in `Section.ts` and `Tag.ts`.

Front-end code is located in `app` directory:

1. `src/index.tsx`:

- All routes for the front-end application are determined in this file:

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

2. `src/components/Article.tsx`:

- Example of using generated queries from [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) and the `useParams` hook to get the URL slug value(s) from the dynamic params passed in from the current URL:

```typescript
import { useGetArticleQuery } from '../generated'
import { Link, useParams } from 'react-router-dom'

const Article = () => {
  const { section, article } = useParams()
  const { data, error, loading } = useGetArticleQuery({
    variables: {
      slug: article,
    },
  })
```

Similar structure is also used in `src/components/Section.tsx` and `src/commponents/Tag.tsx`.

3. `src/components/Article.tsx`:

- Note the following:

```javascript
if (data.Article.section?.slug !== section) {
  return <NotFound />
}
```

This check ensures that both the section and article slugs are correct in order to render the data on the front end. If either is incorrect, the application routes to the `NotFound` page.

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

#### GraphQL Query Arguments

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
