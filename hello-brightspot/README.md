# Hello GraphQL React

This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA).

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `hello-brightspot` directory:

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

In Brightspot, publish Hello Brightspot content. Add your name and a mesage. After publishing the content, input your name in the frontend application input field. You should see `Hello <your name>` name appear along with the message you entered in Brightspot.

## How everything works

Brightspot makes it possible to create content that you can then query for using the GraphQL API. In addition, you can change the schema that your GraphQL endpoint provides with ease. While you can do this all editorially, JS Classes make it incredibly simple to create content and schema programatically.

Navigate to `brightspot/src/examples/hello_brightspot`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:

- `HelloBrightspot.ts`: the model (class) that contains the business logic (fields, etc)
- `HelloBrightspotViewModel.ts`: the class that contains logic requirements needed for the view (the frontend application)
  - getter functions determine what fields will be included in the schema
- `HelloBrightspotEndpoint.ts`: the class that creates a custom Content Delivery Endpoint with the following configurations:
  - `updateCorsConfiguration`: permit cross-origin resource sharing (CORS) to enable requests from localhost
  - `getAccessOption`: implicit access so an API key is not required
  - `getPaths`: specify the path(s) to send HTTP requests to (this path is added to `app/.env`)
  - `Singleton`: create a 'one and only' instance of the custom endpoint
  - `setQueryEntryFields`: use the View Model class to determine the schema for the custom endpoint

## Try it yourself

The following are suggestions for learning more about JS Classes and Brightspot:

1. Add a new field for your Hello Brightspot content: add a color value and use that value to change the color of your content on the front end. Try adding other fields.

2. Add the `@JavaRequired` decorator above the field of your choice to make the field required. See what happens when you try to leave that field blank in Brightspot.

3. Try changing the path and then check in Brightspot: navigate to `Admin`, `APIs`, and then your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!

4. Create Hello Brightspot content with the name `Brightspot` and no message. Look at the `HelloBrightspotViewModel.ts` file. Guess what you will see if you enter that name in the frontend input field!

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
