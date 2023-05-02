# Brightspot Routing

Many front-end applications use URL paths to identify what data they need to fetch. Brightspot provides a routing solution that gives editors control over the paths associated with their content. The routing APIs enable content to be queried by URL path and add metadata to the URL paths in the form of permalinks, aliases, and redirects.

This example demonstrates how to use the routing APIs to fetch content by URL path and control the routing of a front-end application using the URL path metadata.

## What you will learn

1. [Expose content URL path as a GraphQL query argument.](#1-expose-content-url-path-as-a-graphql-query-argument)
2. [Route a React app based on the URL path](#2-route-a-react-app-based-on-the-url-path)
3. [Handle redirects based on URL path metadata](#3-handle-redirects-based-on-url-path-metadata)

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

## Using the example application

The React app is a simple news site with content consisting of **Sections** and **Articles**. **Sections** and **Articles** are set up to automatically generate permalinks in the URLs widget on the content edit page. The auto-generated permalinks are based on the section's name and the article's headline.

Publish one or more **Sections** and/or **Articles** in Brightspot and then navigate through the React app to find the published content. When viewing a specific section or article, note that the React app URL path matches the permalink in Brightspot. The React app is using the URL path to query for the matching content in Brightspot.

Additional URLs can be added to each instance of content. Try adding different types of URLs (aliases or redirects) but remember that it is best practice to have only a single permalink.

## How everything works

### 1. Expose content URL path as a GraphQL query argument

For a content type to leverage the routing APIs, it must implement the `Directory.Item` abstract class and the `createPermalink()` abstract method.

The `createPermalink()` method automatically generates a permalink URL path for the content following the method implementation. The implementation should be based on a field from the content type (like `headline` in an **Article** type) and should include some form of string normalization (like replace spaces with hyphens).

```ts
[`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
  return this.headline?.toLowerCase()
      .replace(/ /g, '-')
}
```

Implementing the abstract class and method above exposes the URL path as a query argument in the resulting GraphQL schema, allowing front-end applications to use their URL path to fetch the matching content from Brightspot.

A GraphQL query could look similar to the **Article** query below.

```
query ExampleQuery($path: String) {
  Article(model: { path: $path }) {
    headline
    body
  }
}
```

### 2. Route a React app based on the URL path

This example uses [React Router](https://reactrouter.com/en/main/start/overview) to control the UI and [Apollo Client](https://www.apollographql.com/docs/react/get-started) to fetch data. The `Content.tsx` component queries the Brightspot endpoint for content using its current URL path as a query variable.

Brightspot returns the matching resource and the React app determines which component to render.

[Content.tsx](./app/src/components/Content.tsx)

```tsx
const Content = () => {
  const parameters = useParams() // https://reactrouter.com/en/main/hooks/use-params

  // builds a 'path' string from the URL paramaters
  // e.g. 'http://localhost:3000/example-section/example-article' => '/example-section/example-article'
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

### 3. Handle redirects based on URL path metadata

Brightspot stores additional metadata about each URL path including information about its type (permalink, alias, or redirect). A front-end application can use this metadata to make decisions about how to route the application. For example, if an app gets data for a piece of content using a URL path that has the redirect type, it would know to redirect the web browser.

This metadata can be included in the content's [View Model](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/view-models) so that it appears as a field on the resulting GraphQL schema. This example names it `directoryData` and breaks it down into a list of `path` and `type` pairs as shown in the example response below.

```json
{
  "data": {
    "Article": {
      "headline": "Example Article",
      "directoryData": {
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
}
```

The `directoryData` GraphQL schema field is added to the `ArticleViewModel` with the `getDirectoryData()` method. It returns a view model that represents the URL path metadata.

[ArticleViewModel.ts](./brightspot/src/brightspot/example/brightspot_routing/ArticleViewModel.ts)

```ts
@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.ArticleViewModel',
  ViewModel.Of(Article)
) {
  // Other fields...

  // Adds a field for URL path metadata
  @JavaMethodParameters()
  @JavaMethodReturn(DirectoryDataViewModel)
  getDirectoryData(): DirectoryDataViewModel {
    return this.createView(DirectoryDataViewModel.getClass(), this.model)
  }
}
```

The URL path metadata can be accessed by using the `as(DirectoryData.class)` API (e.g. `this.model.as(DirectoryData.class)`). This example uses the `getPaths()` method available on the `DirectoryData` class to get the list of URL paths.

[DirectoryDataViewModel.ts](./brightspot/src/brightspot/example/brightspot_routing/DirectoryDataViewModel.ts)

```ts
// Defines the fields available under Directory Data
@ViewInterface
export default class DirectoryDataViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.DirectoryDataViewModel',
  ViewModel.Of(JavaRecord)
) {
  // Adds a field for the set of URL paths
  @JavaMethodParameters()
  @JavaMethodReturn(JavaSet.Of(DirectoryPathViewModel))
  getPaths(): JavaSet<DirectoryPathViewModel> {
    return this.createViews(
      DirectoryPathViewModel.getClass(),
      this.model.as(DirectoryData.class).getPaths()
    )
  }
}
```

The `path` and `type` pairs are added to the `DirectoryPathViewModel` representing each individual URL path.

[DirectoryPathViewModel.ts](./brightspot/src/brightspot/example/brightspot_routing/DirectoryPathViewModel.ts)

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

With the view models updated, the React app can fetch the URL path metadata alongside the normal content fields. The app checks the React URL path against the returned content's directory data. If it finds that the React URL path refers to a redirect, it routes the app to the content's permalink path.

This example only checks the directory data for redirects, but could be set to behave differently for each URL path type.

[Content.tsx](./app/src/components/Content.tsx)

```tsx
const Content = () => {
  // fetch data...

  if (data?.Article) {
    // if the React URL path is a redirect, navigate the app to the permalink path
    if (isRedirect(urlPath, data.Article.directoryData)) {
      return <Navigate to={findPermalink(data.Article.directoryData)} />
    }
    // else render the Article component
    return <ArticleComponent article={data.Article} />
  }
}
```

> **_Note_** The `isRedirect()` and `findPermalink()` methods are specific to this React app.

## Try it yourself

The following is a suggestion for learning more about routing with Brightspot:

1. Configure Brightspot with a Default Site URL to make it easy for editors to navigate to a piece of content. Navigate to **☰** &rarr; **Admin** &rarr; **Sites & Settings** &rarr; **Global** &rarr; **Main** &rarr; and enter `http://localhost:3000` into the **Default Site URL** field. Then open a content edit page and click on a hyperlink in the URLs widget.
2. By default, permalinks are only automatically generated once for each piece of content and any further changes require manual input. Consider a case where the front-end app is not yet live and the URL structures are still in flux. Brightspot can be configured to always generate permalinks and replace any existing permalink. Navigate to **☰** &rarr; **Admin** &rarr; **Sites & Settings** &rarr; **Global** &rarr; **CMS** &rarr; **Advanced** and toggle on the **Always Generate Permalinks** and **Single Generated Permalink** fields. Then edit an existing **Article** and update the headline to force a new permalink to be generated.
3. Consider a case where the app needs to serve 3xx status codes on redirect. Try implementing an app that handles server side rendering and redirects with status codes (See [Next.js Redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects)).

## Troubleshooting

If you make any changes to GraphQL queries in the React app, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
