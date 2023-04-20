# Brightspot Routing

Many front-end applications use URL segments to identify what data they need to fetch. By default, Brightspot content can be uniquely identified by `id`, but `id`s are not suited for use in human-readable URLs.

Brightspot provides the `Directory` class which includes APIs for managing URL paths to content stored in the database. These URL paths uniquely identify content and include context in the form of permalinks, aliases, and redirects. This information can also be made available in the content's view model.

This example demonstrates how to use Brightspot's Directory system to get URL path data and use it to control routing in a front-end application.

## What you will learn

1. [Allow URL path as a query argument.](#1-allow-url-path-as-a-query-argument)
2. [Expose URL path data to an endpoint.](#2-expose-url-path-data-to-an-endpoint)
3. [Route a React app based on the URL path data](#3-route-a-react-app-based-on-the-url-path-data).

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

### Start the react app

To run the front end:

```sh
$ yarn start
```

```
Compiled successfully!
```

The React app opens automatically in the browser.

## Using the example application

The React app is a simple news site with content consisting of Sections and Articles. Sections and Articles are set up to automatically generate permalinks in the URLs widget on the content edit page. The auto-generated permalinks are based on the Section's name and the Article's headline.

Publish one or more Sections and/or Articles in Brightspot and then navigate through the React app to find the published content. When viewing a specific Section or Article, note that the React app URL matches the permalink in Brightspot. The React app is using the URL to query for the matching content in Brightspot.

Additional URLs can be added to each instance of content. Try adding different types of URLs (aliases or redirects) but remember that it is best practice to have only a single permalink.

## How everything works

### 1. Allow URL path as a query argument

For a content type to utilize Brightspot's Directory system it must implement the `Directory.Item` abstract class and provide the body of the `createPermalink()` method. This exposes `path` as a query argument in the resulting GraphQL schema, allowing the React app to use its URL parameters as query variables to fetch the matching data from Brightspot.

The `createPermalink()` method automatically generates a permalink URL path for the content following the method implementation. It calculates the permalink as you enter data into the form in real time.

```ts
[`createPermalink(com.psddev.cms.db.Site)`](site: Site): string {
  return Utils.toNormalized(this.name)
}
```

### 2. Expose URL path data to an endpoint

Once the React app has queried the endpoint for a specific piece of content, it needs to know what type of URL paths exist on the content in order to take the appropriate action. For example, the React app will behave differently if the `path` is a redirect versus a permalink.

The directory data can be included in the content's view model so that it is avaiable as a field on the endpoint.

[ArticleViewModel.ts](./brightspot/src/brightspot/example/brightspot_routing/ArticleViewModel.ts)

```ts
@ViewInterface
export default class ArticleViewModel extends JavaClass(
  'brightspot.example.brightspot_routing.ArticleViewModel',
  ViewModel.Of(Article)
) {
  // Other fields...

  // Adds a field for Directory Data
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
  // Adds a field for the set URL paths
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

### 3. Route a React app based on the URL path data

This example uses [React Router](https://reactrouter.com/en/main/start/overview) to control the UI and fetch data. The `Content.tsx` component queries the Brightspot endpoint for content using its current URL parameters as the `path` query variable.

[Content.tsx](./app/src/components/Content.tsx)

```ts
const Content = () => {
  const parameters = useParams()

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

Brightspot returns the matching resourse and the React app checks the current URL parameters against the content's directory data. If it finds that the current path refers to a redirect it routes the app accordingly.

[Content.tsx](./app/src/components/Content.tsx)

```ts
const Content = () => {
  // fetch data...

  if (data?.Article) {
    // if the React URL path is a redirect, navigate the app to the permalink path
    if (currentPathIsRedirect(currentPath, data.Article.directoryData)) {
      return <Navigate to={data.Article.path || '/'} />
    }
    // else render the Article component
    return <ArticleComponent article={data.Article} />
  }
}
```

This example only checks the directory data for redirects, but could be set up to behave differently for each URL path type.

## Try it yourself

The following is a suggestion for learning more about routing with Brightspot:

1. Configure Brightspot with a Default Site URL to make it easy for editors to navigate to a piece of content. Navigate to **☰** &rarr; **Admin** &rarr; **Sites & Settings** &rarr; **Global** &rarr; **Main** &rarr; and enter `http://localhost:3000` into the **Default Site URL** field. Then open a content edit page and click on a hyperlink in the URLs widget.
2. Consider a case where the app needs to serve 3xx status codes on redirect. Try implementing an app that handles server side rendering and redirects with status codes (See [Next.js Redirects](https://nextjs.org/docs/api-reference/next.config.js/redirects)).

## Troubleshooting

If you make any changes to GraphQL queries in the React app, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
