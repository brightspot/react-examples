# Brightspot Routing

Many front-end applications use URL paths to identify what data they need to fetch. Brightspot provides a routing solution that gives editors control over the paths associated with their content. The routing APIs enable content to be queried by URL path, and add metadata to the URL paths in the form of permalinks, aliases, and redirects.

This example demonstrates how to use the routing APIs to fetch content by URL path, and to control the routing of a front-end application using the URL path metadata.

## What you will learn

1. [Expose content URL path as a GraphQL query argument.](#step-1-expose-content-url-path-as-a-graphql-query-argument)
1. [Route a React app based on the URL path](#step-2-route-a-react-app-based-on-the-url-path)
1. [Handle redirects based on URL path metadata](#step-3-handle-redirects-based-on-url-path-metadata)

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

## Using the example application

The React app is a simple news site with content consisting of sections articles. The sections and articles automatically generate permalinks in the **URLs** widget on the content edit page. The auto-generated permalinks are based on the section's name and the article's headline.

Publish one or more sections and articles in Brightspot, and then navigate through the React app to find the published content. When viewing a specific section or article, note that the React app's URL path matches the permalink in Brightspot. The React app is using the URL path to query for the matching content in Brightspot.

Additional URLs can be added to each asset. Try adding different types of URLs (aliases or redirects), but remember that it is best practice to have only a single permalink.

## How everything works

### Step 1. Expose content URL path as a GraphQL query argument

For a content type to leverage the routing APIs, it must implement the `Directory.Item` abstract class and the `createPermalink()` abstract method.

The `createPermalink()` method automatically generates a permalink URL path for the asset as specified in the method's implementation. The implementation should be based on a field from the content type (e.g., `headline` in an `Article` type), and should include some form of string normalization (e.g., replace spaces with hyphens).

```ts
[`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
  return this.headline?.toLowerCase()
      .replace(/ /g, '-')
}
```

The above implementation exposes the URL path as a query argument in the resulting GraphQL schema, allowing front-end applications to use their URL path to fetch the matching asset from Brightspot.

A GraphQL query could look similar to the following `Article` query.

```graphql
query ExampleQuery($path: String) {
  Article(model: { path: $path }) {
    headline
    body
  }
}
```

### Step 2. Route a React app based on the URL path

This example uses [React Router](https://reactrouter.com/en/main/start/overview) to control the UI and [Apollo Client](https://www.apollographql.com/docs/react/get-started) to fetch data. The `Content.tsx` component queries the Brightspot endpoint for content using its current URL path as a query variable.

Brightspot returns the matching resource, and the React app determines which component to render.

The following example is in the file [Content.tsx](./app/src/components/Content.tsx).

```tsx
const Content = () => {
  const parameters = useParams() // https://reactrouter.com/en/main/hooks/use-params

  // builds a 'path' string from the URL parameters
  // e.g., 'http://localhost:3000/example-section/example-article' => '/example-section/example-article'
  let urlPath = '/' + Object.values(parameters)

  // Apollo Client queries the endpoint with the 'path' string as a variable
  const { data, error, loading } = useGetContentQuery({
    variables: {
      path: urlPath,
    },
  })

  // Checks the response data to determine which component to render
  if (data?.Section) {
    return <SectionComponent section={data.Section} />
  }

  if (data?.Article) {
    return <ArticleComponent article={data.Article} />
  }

  return <NotFound />
}
```

### Step 3. Handle redirects based on URL path metadata

Brightspot stores additional metadata about each URL path, including information about its type (permalink, alias, or redirect). A front-end application can use this metadata to make decisions about how to route the application. For example, if an app receives data for an asset using a URL path that has the redirect type, it would know to redirect the web browser.

This metadata can be included in the content's [view model](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/view-models) so that it appears as a field on the resulting GraphQL schema. This example names it `paths`, and breaks it into a list of `path` and `type` pairs as shown in the example response below.

```json
{
  "data": {
    "Article": {
      "headline": "Example Article",
      "paths": [
        {
          "path": "/example-article",
          "type": "Permalink"
        },
        {
          "path": "/example-redirect",
          "type": "Redirect (Permanent)"
        }
      ]
    }
  }
}
```

The `paths` GraphQL schema field is added to the `ArticleViewModel` with the `getPaths()` method. It returns a list of view models that represent each URL path and its metadata by using the `as(DirectoryData.class)` API (e.g., `this.model.as(DirectoryData.class)`). This example, in the file [ArticleViewModel.ts](./brightspot/src/brightspot/example/brightspot_routing/ArticleViewModel.ts), uses the `getPaths()` method available in the `DirectoryData` class to get the list of URL paths.

```ts
@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.ArticleViewModel',
  ViewModel.Of(Article)
) {
  // Other fields...

  // Adds a field for URL paths and associated metadata
  @JavaMethodParameters()
  @JavaMethodReturn(List.Of(DirectoryPathViewModel))
  getPaths(): List<DirectoryPathViewModel> {
    return this.createViews(
      DirectoryPathViewModel.getClass(),
      this.model.as(DirectoryData.class).getPaths()
    )
  }
}
```

The `path` and `type` pairs are added to the `DirectoryPathViewModel` representing each individual URL path. The following example is in the file [DirectoryPathViewModel.ts](./brightspot/src/brightspot/example/brightspot_routing/DirectoryPathViewModel.ts).

```ts
// Defines the fields available under Directory Path
@ViewInterface
export default class DirectoryPathViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.DirectoryPathViewModel',
  ViewModel.Of(DirectoryPath)
) {
  // Adds a field for the specific path
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getPath(): string {
    return this.model.getPath()
  }

  // Adds a field for the path type
  @JavaMethodParameters()
  @JavaMethodReturn(String)
  getType(): string {
    return this.model.getType().toString()
  }
}
```

With the view models updated, the React app can fetch the URL path's metadata alongside the normal asset fields. The app checks the React URL path against the returned asset's paths. If the app finds that the React URL path refers to a redirect, it routes the app to the asset's permalink path.

This example, in the file [Content.tsx](./app/src/components/Content.tsx), only checks the URL paths for redirects, but could be set to behave differently for each URL path type.

```tsx
const Content = () => {
  // fetch data...

  if (data?.Article) {
    // if the React URL path is a redirect, navigate the app to the permalink path
    if (isRedirect(urlPath, data.Article.paths)) {
      return <Navigate to={findPermalink(data.Article.paths)} />
    }
    // else render the Article component
    return <ArticleComponent article={data.Article} />
  }
}
```

> **_Note:_** The `isRedirect()` and `findPermalink()` methods are specific to this React app.

## Try it yourself

The following is a suggestion for learning more about routing with Brightspot:

* The hyperlinks in the **URLs** widget of the content edit page can be configured to link directly to the matching asset on the React app. Create a new site at **☰ > Admin > Sites & Settings > New Site**, add `http://localhost:3000` into the **URLs** field, and click **Save**. Next, uncomment the `REACT_APP_BSP_SITE_URL` line in the `app/.env` file, and restart the React server. Then publish some content in Brightspot under the new site, and test the hyperlinks in the **URLs** widget.

* Consider improving the search engine optimization of this app by incorporating aliases. The `Alias` path type lets the React app know that it is not using the "canonical" or preferred path for the asset. Add conditional statements to each component to check if the URL path is referring to an alias. If so, modify the document head to include a [canonical link element](https://en.wikipedia.org/wiki/Canonical_link_element). Consider using a node package such as [React Helmet](https://www.npmjs.com/package/react-helmet) to simplify changes to the document head.

* By default, permalinks are automatically generated only once for each asset, and any further changes require manual input. Consider a case in which the front-end app is not yet live, and the URL structures are still in flux. Brightspot can be configured to always generate permalinks and replace any existing permalink. Navigate to **☰ > Admin > Sites & Settings > Global > CMS > Advanced**, and toggle on the **Always Generate Permalinks** and **Single Generated Permalink** fields. Then open an existing article, and update the headline to force generation of a new permalink.

* Consider a case in which the app needs to serve 3xx status codes on redirect. Try implementing an app that handles server-side rendering, and redirects with status codes (See [Next.js Redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects)).

## Troubleshooting

If you make any changes to GraphQL queries in the React app, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
