# App Routing

This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to add dynamic routing in a front-end application. A very similar example, `brightspot-routing` uses permalinks generated in Brightspot as query variables. This example demonstrates how to use other fields as query variables.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `hello-world` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front-end:

```
cd app
yarn
yarn dev
```

The front-end application will open automatically in the browser.

## Using the example application

The front-end application is a simple news website. Content consists of pages and articles.

Publish the following content in Brightspot:

1. Page(s)
2. Article(s)

Navigate to your front-end application to see your content displayed!

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). 

One powerful feature Brightspot provides ease of content modeling and querying for content data with GraphQL.

Navigate to `brightspot/src/examples/app_routing`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:
- `Page.ts`: the content model for a Page 
  - `@JavaRequired`: make the field a required field
  - `@Indexed({ unique: true })`: make the field a query variable
  - `beforeCommit`: a callback in the database save life cycle to normalize the slug string
- `PageViewModel.ts`: 
  - `Query`: the Query API provides several methods for retrieving objects, filtering results, and performing actions on retrieved objects. In `PageViewModel`, Query is used to select Articles corresponding to the Page specified in the Article
  - `createViews`: create an iterable over views using the specified view model class and model
- `PagesViewModel.ts`: 
  - `ViewModel.Of(AppRoutingEndpoint)`: specifying the `AppRoutingEndpoint` makes it possible to query for Pages without a query variable
  - `createViews`: create an iterable over views using the specified view model class and model. Select all pages 
- `Article.ts`: note the `page` field so the user can select the connecting Page content
- `ArticleViewModel.ts`: 
  - `createView`: create a view using the specified view model class and model
- `ArticlesViewModel.ts`:
  - `ViewModel.Of(AppRoutingEndpoint)`: specifying the `AppRoutingEndpoint` makes it possible to query for Articles without a query variable
  - `createViews`: create an iterable over views using the specified view model class and model. Select all articles 
- `AppRoutingEndpoint.ts`: the class that creates a custom Content Delivery Endpoint. It implements `Singleton` to specify that there is only one instance of this endpoint. It has the following configurations:
  - `getPaths`: specify the path(s) to send HTTP requests to (this path is added to `app/.env`)
  - `getQueryEntryFields`: specifies all of the entry fields for the endpoint
  - `updateCorsConfiguration`: permit cross-origin resource sharing (CORS) to enable requests from localhost 
  - `getAccessOption`: implicit access so an API key is not required

#### Routing with Next.js

The front-end application uses the dynamic routing Next.js provides. For more information, refer to the [Next.js](https://nextjs.org/) documentation. The query parameter captured using `useRouter` enables GraphQL querying using the fields defined with JS Classes.

## Try it yourself

The following is a suggestion for learning more about JS Classes and Brightspot:

1. Search for `TRY-IT!` in the front-end application. Follow the prompts to try using the `headline` field as a query field instead of slug for Article. Notice how the url to the Article is different versus using `slug`. 

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to updated the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.
