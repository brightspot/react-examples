# Content Delivery
This example highlights how simple it is to use JS Classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) for generating a GraphQL Content Delivery API endpoint (CDA).

## What you will learn
- How a custom Content Delivery API endpoint is created with JS Classes and how to add query entry fields to that endpoint
- What the core structure of a View Model and Content Class looks like with JS Classes
- How to create a simple front-end application with [React](https://reactjs.org/) that displays content published in Brightspot
## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `content-delivery` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the frontend:

```sh
cd app
yarn
yarn start
```

The frontend application will open automatically in the browser.

## Using the example application
In Brightspot, create **Color** content by clicking the **+** button found next to the search field and selecting **Color** from the dropdown menu. Fill in the **Name** and **Hex Value** fields with data and then click the green **PUBLISH** button. After publishing content, input the **Color** name in the frontend application input field. You should see the **Color** name and hex value.

## How everything works
Brightspot makes it possible to create content that you can then query for using the GraphQL API. In addition, you can change the schema that your GraphQL endpoint provides with ease. While you can do this all editorially, JS Classes make it incredibly simple to create content and schema programatically.

Navigate to `brightspot/src/brightspot/examples/content_delivery`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:
- `Color.ts`: the class that defines the data model (fields, etc)
- `ColorViewModel.ts`: the class that contains logic requirements needed for the view (the frontend application)
  - getter functions determine what fields will be included in the schema
- `ColorEndpoint.ts`: the class that creates a custom Content Delivery Endpoint. It implements Singleton to specify that there is only one instance of this endpoint
  - `getPaths`: specify the path(s) to send HTTP requests to (this path is added to `app/.env`)
  - `getQueryEntryFields`: specify the View Model class that drives the schema for the custom endpoint
  - `updateCorsConfiguration`: permit cross-origin resource sharing (CORS) to enable requests from localhost
  - `getAccessOption`: implicit access so an API key is not required

## Try it yourself
The following are suggestions for learning more about JS Classes and Brightspot:

1. Add a new field for your **Color** content: one idea is to add a complementary hex value that you can use on the frontend as an accent.
2. Add the `@JavaRequired` decorator above the field of your choice to make the field required. See what happens when you try to leave that field blank in Brightspot.
3. Try changing the path and then check in Brightspot: navigate to **Admin**, **APIs**, and then your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!
4. Create a **Color** content item with the name `Brightspot` and no hex value. Look at the `ColorViewModel.ts` file. Guess what color will appear. Now confirm on the frontend.

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.