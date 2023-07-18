# Content Delivery
This example highlights using JavaScript classes and the [Brightspot GraphQL API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/graphql-api) to generate a GraphQL Content Delivery API  (CDA) endpoint.

## What you will learn
- How a custom CDA endpoint is created with JavaScript classes, and how to add query entry fields to that endpoint.
- What the core structure of a view model and content class looks like with JavaScript classes.
- How to create a simple front-end application with [React](https://reactjs.org/) that displays content published in Brightspot.

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then run the following commands.

To upload JavaScript classes in Brightspot (http://localhost/cms):

```sh
cd content-delivery/brightspot/
yarn
npx brightspot types download
npx brightspot types upload src
```

To run the front end:

```sh
cd content-delivery/app/
yarn
yarn start
```

The front-end application will open automatically in the browser.

## Using the example application

In Brightspot, create a **Color** asset by doing the following:

1. Click **+** next to the search field and select **Color** from the dropdown menu.
1. Fill in the **Name** and **Hex Value** fields.
1. Click **Publish**.
1. Input the **Color** name in the front-end application's input field.

The response includes the color's name and hex value.

## How everything works
You can publish assets in Brightspot, and then use the GraphQL API to query for those assets. In addition, you can change the schema that your GraphQL endpoint provides. You can perform all these tasks with JavaScript classes.

Navigate to `brightspot/src/brightspot/example/content_delivery/`. This directory contains the JavaScript class files that are uploaded to Brightspot.

### JavaScript class files
- `Color.ts`: Defines the data model (fields and methods).
- `ColorViewModel.ts`: Contains logic needed for the view (the front-end application). The getter functions determine which fields will be included in the schema.
- `ColorEndpoint.ts`: Creates a custom Content Delivery Endpoint. It implements `Singleton` to specify that there is only one instance of this endpoint. This class has the following methods:
  - `getPaths`: Specifies the target paths for sending HTTP requests (this path is added to `app/.env`).
  - `getQueryEntryFields`: Specifies the view-model class that drives the schema for the custom endpoint.
  - `updateCorsConfiguration`: Permits cross-origin resource sharing (CORS) to enable requests from localhost.
  - `getAccessOption`: Allows implicit access, so an API key is not required.

## Try it yourself
The following are suggestions for learning more about JavaScript classes and Brightspot:

1. Add a new field for your **Color** content, such as a complementary hex value that you can use on the front end as an accent.
1. Add the `@JavaRequired` decorator above the field of your choice to make the field required. See what happens when you try to leave that field blank in Brightspot.
1. Change the path, and then check in Brightspot. Navigate to **Admin > APIs**, and then your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!
1. Create a **Color** asset with the name `Brightspot` and no hex value. Look at the `ColorViewModel.ts` file. Guess what color will appear. Now confirm on the front end.

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
