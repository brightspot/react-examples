# Colors

This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA).

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `colors` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the frontend:

```
cd app
yarn
yarn start
```

The frontend application will open automatically in the browser.

## Using the example application

In Brightspot, publish some Color content. Add the color name and hex value. After publishing the content, input the color name in the frontend application input field. You should see the color name and hex value.

## How everything works

Brightspot makes it possible to create content that you can then query for using the GraphQL API. In addition, you can change the schema that your GraphQL endpoint provides with ease. While you can do this all editorially, JS Classes make it incredibly simple to create content and schema programatically.

Navigate to `brightspot/src/examples/colors`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:

- `Color.ts`: the model (class) that contains the business logic (fields, etc)
- `ColorViewModel.ts`: the class that contains logic requirements needed for the view (the frontend application)
  - getter functions determine what fields will be included in the schema
- `ColorEndpoint.ts`: the class that creates a custom Content Delivery Endpoint with the following configurations:
  - `Singleton`: create a 'one and only' instance of the custom endpoint
  - `getPaths`: specify the path(s) to send HTTP requests to (this path is added to `app/.env`)
  - `getQueryEntryFields`: use the View Model class to determine the schema for the custom endpoint
  - `updateCorsConfiguration`: permit cross-origin resource sharing (CORS) to enable requests from localhost
  - `getAccessOption`: implicit access so an API key is not required

## Try it yourself

The following are suggestions for learning more about JS Classes and Brightspot:

1. Add a new field for your Color content: one idea is to add a complementary hex value that you can use on the frontend as an accent.

2. Add the `@JavaRequired` decorator above the field of your choice to make the field required. See what happens when you try to leave that field blank in Brightspot.

3. Try changing the path and then check in Brightspot: navigate to `Admin`, `APIs`, and then your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!

4. Create a Color content item with the name `Brightspot` and no hex value. Look at the `ColorViewModel.ts` file. Guess what color will appear. Now confirm on the frontend.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
