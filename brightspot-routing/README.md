# Brightspot Routing

Many front-end applications use URL paths to identify what data they need to fetch. Brightspot provides a routing solution that gives editors control over the paths associated with their content. The routing APIs enable content to be queried by URL path and add metadata to the URL paths in the form of permalinks, aliases, and redirects.

This example demonstrates how to use the routing APIs to fetch content by URL path and control the routing of a front-end application using the URL path metadata.

## What you will learn

1. [Expose URL path as a query argument.](#1-expose-url-path-as-a-query-argument)
2. [Expose URL path metadata as query fields.](#2-expose-url-path-metadata-as-query-fields)
3. [Route a React app based on the URL path metadata](#3-route-a-react-app-based-on-the-url-path-metadata).

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

### 1. Expose URL path as a query argument

Brightspot's routing APIs are powered by the [Directory](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/permalinks) class.

For a content type to use the `Directory` class it must implement the `Directory.Item` abstract class and provide the body of the `createPermalink()` method. This exposes `path` as a query argument in the resulting GraphQL schema, allowing the React app to use its URL path as a query variable to fetch the matching content from Brightspot.

The `createPermalink()` method automatically generates a permalink URL path for the content following the method implementation. It calculates the permalink as you enter data into the content edit form in real time.

```ts
[`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
  return Utils.toNormalized(this.name)
}
```

### 2. Expose URL path metadata as query fields

Once the React app has queried the endpoint for a specific piece of content, it needs to know what type of URL paths exist on the content in order to take the appropriate action. For example, the React app will behave differently if the `path` is a redirect versus a permalink.

The URL path metadata can be included in the content's [View Model](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/view-models) so that it appears as a field on the resulting GraphQL schema.

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
    return this.createView(
      DirectoryDataViewModel.getClass(),
      this.model.as(DirectoryData.class)
    )
  }
}
```

[DirectoryDataViewModel.ts](./brightspot/src/brightspot/example/brightspot_routing/DirectoryDataViewModel.ts)

```ts
// Defines the fields available under Directory Data
@ViewInterface
export default class DirectoryDataViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.DirectoryDataViewModel',
  ViewModel.Of(DirectoryData)
) {
  // Adds a field for the set of URL paths
  @JavaMethodParameters()
  @JavaMethodReturn(JavaSet.Of(DirectoryPathViewModel))
  getPaths(): JavaSet<DirectoryPathViewModel> {
    return this.createViews(
      DirectoryPathViewModel.getClass(),
      this.model.getPaths()
    )
  }
}
```

[DirectoryPathViewModel.ts](./brightspot/src/brightspot/example/brightspot_routing/DirectoryPathViewModel.ts)

```ts
// Defines the fields available under Directory Paths
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

### 3. Route a React app based on the URL path metadata

This example uses [React Router](https://reactrouter.com/en/main/start/overview) to control the UI and fetch data. The `Content.tsx` component queries the Brightspot endpoint for content using its current URL path as a query variable.

[Content.tsx](./app/src/components/Content.tsx)

```ts
const Content = () => {
  const parameters = useParams() // https://reactrouter.com/en/main/hooks/use-params

  // builds a 'path' string from the URL parameters
  let currentPath = ''
  Object.values(parameters).forEach(
    (parameter) => (currentPath += `/${parameter}`)
  )

  // Apollo Client queries the endpoint with the 'path' string
  const { data, error, loading } = useGetContentQuery({
    variables: {
      path: currentPath,
    },
  })

  // return (...)
}
```

Brightspot returns the matching resourse and the React app checks the current URL path against the content's directory data. If it finds that the current path refers to a redirect it routes the app accordingly.

[Content.tsx](./app/src/components/Content.tsx)

```ts
const Content = () => {
  // fetch data...

  if (data?.Article) {
    // if the React URL path is a redirect, navigate the app to the permalink path
    if (isRedirect(currentPath, data.Article.directoryData)) {
      return <Navigate to={data.Article.path || '/'} />
    }
    // else render the Article component
    return <ArticleComponent article={data.Article} />
  }
}
```

This example only checks the directory data for redirects, but could be set to behave differently for each URL path type.

## Try it yourself

The following is a suggestion for learning more about routing with Brightspot:

1. Configure Brightspot with a Default Site URL to make it easy for editors to navigate to a piece of content. Navigate to **☰** &rarr; **Admin** &rarr; **Sites & Settings** &rarr; **Global** &rarr; **Main** &rarr; and enter `http://localhost:3000` into the **Default Site URL** field. Then open a content edit page and click on a hyperlink in the URLs widget.
2. By default, permalinks are only automatically generated once for each piece of content and any further changes require manual input. Consider a case where the front-end app is not yet live and the URL structures are still in flux. Brightspot can be configured to always generate permalinks and replace any existing permalink. Navigate to **☰** &rarr; **Admin** &rarr; **Sites & Settings** &rarr; **Global** &rarr; **CMS** &rarr; **Advanced** and toggle on the **Always Generate Permalinks** and **Single Generated Permalink** fields. Then edit an existing **Article** and update the headline to force a new permalink to be generated.
3. Consider a case where the app needs to serve 3xx status codes on redirect. Try implementing an app that handles server side rendering and redirects with status codes (See [Next.js Redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects)).

## Troubleshooting

If you make any changes to GraphQL queries in the React app, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
