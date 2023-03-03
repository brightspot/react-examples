# App Routing

By default, Brightspot's [Brightspot’s Content Delivery API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/cda-guides) is set up to accept `id` arguments when querying for data. Brightspot also provides the `path` argument for content implementing the `DirectoryItem` interface. [`Directory`](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/permalinks#url-paths) and its inner classes provide several APIs to support URL paths.

However,  if `id` and `path` do not fit your application needs, Brightspot provides the flexibility to choose custom field arguments. 

This example demonstrate how to use JS Classes to create new field arguments for querying data using Brightspot’s Content Delivery API.  

What you will learn:
1. How to use JS Classes to customize field arguments for fetching data using Brightspot’s Content Delivery API.
2. How to use [React Router](https://reactrouter.com/en/main) with a single-page [React](https://reactjs.org/) front-end application to query for necessary data.

### Related example

[Brightspot Routing](https://github.com/brightspot/react-examples)

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

Since **Article**s are linked to tags and sections, publish **Sections**(s) and **Tag**(s) first, then publish **Article**s.

Navigate to your front-end application to see your content displayed.

## How everything works
The `brightspot/src/examples/app_routing` directory contains the JS Classes files uploaded to Brightspot.

#### Points to note in JS Classes files:
- `@Indexed({ unique: true })`: Using the `Indexed` annotation and setting unique to true makes a field available as a field argument in GraphQL, since the values returned will point to only one instance of content that matches the argument provided. 

- `ViewModel.Of(AppRoutingEndpoint)`: Extending a view model of `AppRoutingEndpoint` makes it possible to query for content without a field argument because `AppRoutingEndpoint` implements `Singleton`, ensuring the endpoint is the only one of its kind.

#### Points to note in the front-end application:
- Note the following check in `app/arc/components/Article.tsx`. 

```javascript
if (data.Article.section?.slug !== section) {
    return <NotFound />
  }
```

This check ensures that both the section and article slugs have to be correct in order to render the data on the front end. If either one are incorrect, the application routes to the `NotFound` page.
## Try it yourself

The following is a suggestion for learning more about app routing with JS Classes and Brightspot:

- Try changing parts of the URL. Verify the path returns the `NotFound` page if any part of the path is incorrect.

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the respository README for assistance.