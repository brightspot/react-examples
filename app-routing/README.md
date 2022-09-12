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
yarn start
```

The front-end application will open automatically in the browser.

## Using the example application

The front-end application is a simple news website. Content consists of: an app, pages, and articles.
Publish an App content item. Add the title of the App (for example 'news') to your .env file in the `NEXT_PUBLIC_APP_TITLE` field.

Next, publish the following content in Brightspot:

1. Page(s)
2. Article(s)

Navigate to your front-end to see your content displayed.

## How everything works

Brightspot gives you the power to customize Brightspot, add new classes, create endpoints, and much more with JS Classes. You can easily link related content to create an easy-to-use GraphQL query structure.

Navigate to `brightspot/src/examples/app_routing`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:

- `App.ts`: the class that acts as the parent class for the application
  - `@JavaRequired`: makes the field a required field
  - `@Indexed({ unique: true })`: this annotation makes it possible to query using this field
- `AppViewModel.ts`: note in particular the `getAllPages` and `getAllArticles` functions to enable querying for all of those content items that are children to the App content item
- `Page.ts`: note the `app` field so the user can select the connecting App content item
- `PageViewModel.ts`: note the `getArticles` function that uses the `Query` class to select Articles connected to a Page
- `Article.ts`: note the `page` field so the user can select the connecting Page content
- `ArticleViewModel.ts`: note the `getPage` function that returns the connected Page for the Article
- `AppRoutingEndpoint.ts`:
  - `Singleton`: only one of it's kind
  - `getPaths`: the path(s) for the endpoint
  - `getQueryEntryFields()`: get all of the entry fields for the endpoint

#### Routing with Next.js

The front-end application uses the dynamic routing Next.js provides. For more information, refer to the [Next.js](https://nextjs.org/) documentation. The query parameter captured using `useRouter` enables GraphQL querying using the fields defined with JS Classes.

## Try it yourself

The following is a suggestion for learning more about JS Classes and Brightspot:

1. Use other fields to query for data. What do you need to add to make a field query-able?

## Troubleshooting

1. My front-end application is not fetching data....

- Make sure you created an App content item, and added the title in `app/.env` (`NEXT_PUBLIC_APP_TITLE`)

For other issues, refer to the [Common Issues](/README.md) section in the respository README for assistance.
