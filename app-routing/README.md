# App Routing
This example shows how to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to create an application routing structure that uses unique, easy-to-understand identifiers in the URL to determine content to display.

By default, you can query for content using Brightspot’s GraphQL API using `id`. You can also use `path` (which are permalinks in Brightspot) if content implements `Directory.Item`. Refer to [Brightspot Routing](https://github.com/brightspot/react-examples) for an example).

However, you can also customize the GraphQL query input field to any unique identifier. If you don’t want to use `id` or `path`, you can decide which input field works best for your application.

This example uses [dynamic segments](https://reactrouter.com/en/main/start/overview#dynamic-segments) for client-side routing in a front-end application. In addition, this application uses URL slugs for creating unique URL paths and GraphQL query variables to retrieve content data using Brightspot’s GraphQL API.

## What you will learn
1. How to create content that uses customized GraphQL query variables in Brightspot.
2. How to create a client-side routing structure with [React Router](https://reactrouter.com/en/main) that takes advantage of customized query variables to fetch data in a front-end application.

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

## Key terms
1. Dynamic segments: Segments of a URL as dynamic placeholders, like parameters in a function.

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

2. Client-side routing: A type of routing where an application can update the URL from a link without making an additional request for another document from the server. Instead, JavaScript is used to update the URL and fetch/display new content. 

3. URL (website) slug: The last part of the URL address that acts as a unique identifier for a webpage.

```javascript
/// unique-url-slug is the URL slug
'https://example.com/unique-url-slug/'
```

4. GraphQL query variable: A GraphQL query is like a function, to which you can provide dynamic arguments. These dynamic arguments are query variables.

```javascript
/// slug is a query variable that enables passing in dynamic slug arguments
query GetArticle($slug: String) {
  Article(model: { slug: $slug }) {
    body
    headline
    publishDate
  }
}
```

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
The `brightspot/src/examples/app_routing` directory contains the JS Classes files that are uploaded to Brightspot.

#### Points to note in JS Classes files:
- `ViewModel.Of(AppRoutingEndpoint)`: Extending a view model of `AppRoutingEndpoint` makes it possible to query for content without a query variable because `AppRoutingEndpoint` implements `Singleton`, ensuring the endpoint is the only one of its kind.

- `@Indexed({ unique: true })`: Using the Indexed annotation and setting unique to true makes a field available as a query input field in GraphQL.

#### Points to note in the front-end application:
- Note the following check in `app/arc/components/Article.tsx`. 

```javascript
if (data.Article.section?.slug !== section) {
    return <NotFound />
  }
```

This check ensures that both the section and article slugs have to be correct in order to render the data on the front end. If both are not correct, the application routes to the `NotFound` page.
## Try it yourself

The following is a suggestion for learning more about app routing with JS Classes and Brightspot:

- Try changing parts of the URL. Verify the path returns the `NotFound` page if any part of the path is incorrect.

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to update the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.