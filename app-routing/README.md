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
yarn codegen
yarn start
```

The front-end application will open automatically in the browser.

## Using the example application

The front-end application is a simple news website. Content consists of pages, tags, and articles.

Publish the following content in Brightspot:

1. Sections(s)
2. Article(s)
3. Tag(s)

> **_Note_** When choosing a slug, avoid spaces, slashes. It is also best to use lowercase letters. An example of a good slug: `my-example-page`. An example of a bad slug: `my Example/page`. 

Navigate to your front-end application to see your content displayed!

## How everything works

JS Classes give you the power to customize Brightspot, add new classes, create endpoints, and much more with JavaScript (TypeScript). 

One powerful feature Brightspot provides is ease of content modeling and querying for content data with GraphQL.

Navigate to `brightspot/src/examples/app_routing`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### Points to note in JS Classes files:
- `ViewModel.Of(AppRoutingEndpoint)`: specifying the `AppRoutingEndpoint` makes it possible to query for Content without a query variable
- `PageEntryView`: adding `PageEntryView` to the List of query entry fields for `AppRoutingEndpoint` make those query fields available using the `AppRoutingEndpoint`. All View Models that implement the `PageEntryView` interface will display as fields under the `PageEntry` field in GraphQL Explorer.

#### Points to note in the front-end application:
- `DyanmicContainer.tsx`: this component uses the `PageEntry` entry field to verify the Content type. The resulting component that is displayed is determined by checking the typename returned by GraphQL. 

## Try it yourself

The following is a suggestion for learning more about app routing with JS Classes and Brightspot:

1. Try changing parts of the url. Verify the path returns the `NotFound` page if any of the path is incorrect.
2. Create a Subsection or other Content type that is a nested component to Section. See if you can implement routing in the client as: `/section/subsection/article`. What are issues you need to consider? 

> **_Note_** If you make any changes to GraphQL queries in the front-end application, be sure to run `yarn codegen` to updated the `app/generated` directory. Refer to the [GraphQL Code Generator documentation](https://www.the-guild.dev/graphql/codegen/docs/getting-started) to learn more.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.