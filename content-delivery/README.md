# Content Delivery
This example demonstrates creating a GraphQL [Content Delivery API](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/cda-guides) (CDA) endpoint to access content published in Brightspot in a front-end application.

## What you will learn

1. [Programmatically create a CDA endpoint with query entry fields.](#step-1-programmatically-create-a-cda-endpoint-with-query-entry-fields)
1. [Create content types and a corresponding view modals.](#step-2-create-content-types-and-corresponding-view-modals)
1. [Display content published in Brightspot in a front-end application.](#step-3-display-content-published-in-brightspot-in-a-front-end-application)

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications. Make sure you have the Docker instance for the example applications running, then run the following commands.

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

### Step 1. Programmatically create a CDA endpoint with query entry fields

- [`ColorEndpoint.ts`](/content-delivery/brightspot/src/brightspot/example/content_delivery/ColorEndpoint.ts): Creates a custom CDA Endpoint. It implements `Singleton` to specify that there is only one instance of this endpoint. This class has the following methods:
  - `getPaths`: Specifies the target paths for sending HTTP requests.
  - `getQueryEntryFields`: Specifies the view-model class that drives the schema for the custom endpoint.
  - `updateCorsConfiguration`: Permits cross-origin resource sharing (CORS) to enable requests from localhost.
  - `getAccessOption`: Allows implicit access, so an API key is not required.

### Step 2. Create content types and corresponding view modals

- [`Color.ts`](/content-delivery/brightspot/src/brightspot/example/content_delivery/Color.ts): Defines the data model(fields and methods).
- [`ColorViewModel.ts`](/content-delivery/brightspot/src/brightspot/example/content_delivery/ColorViewModel.ts): Contains logic needed for the view (the front-end application). The getter functions determine which fields will be included in the schema.

### Step 3: Display content published in Brightspot in a front-end application

- [`.env`](/content-delivery/app/.env): This file contains the GraphQL endpoint URL used for sending API requests to Brightspot.

## Try it yourself
The following are suggestions for learning more about using a Brightspot GraphQL CDA Endpoint:

1. Add a new field for your **Color** content, such as a complementary hex value that you can use on the front end as an accent.
1. Add the `@JavaRequired` decorator above the field of your choice to make the field required. See what happens when you try to leave that field blank in Brightspot.
1. Change the path, and then check in Brightspot. Navigate to **Admin > APIs**, and then your endpoint. You will see the endpoint listed there. Make sure to add the new path in your `app/.env` file!
1. Create a **Color** asset with the name `Brightspot` and no hex value. Look at the `ColorViewModel.ts` file. Guess what color will appear. Now confirm on the front end.

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
