# Pages

This example highlights demonstates using JS Classes to programatically enable a front-end page preview using Brightspot.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `pages` directory:

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

Make sure you have your front-end application running so you can see how the Preview Panel in Brightspot updates real-time.

Create a page in Brightspot. Make sure to enter a title - the rest of the fields are optional. After you publish your material, you will
see the page appear in the Preview Panel in Brightspot! You can also verify in your front-end application that your published content displays.

## How everything works

Brightspot gives you the power to do just about anything with JS Classes. One helpful feature Brightspot provides is a Preview Panel when you are creating content.

Navigate to `brightspot/src/examples/pages`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:

- `Page.ts`: the class that contains the business logic (fields, etc)
  - ` @Indexed({ unique: true })`: This decorator makes it possible to query for data using the specified field
  - `@Note`: Add information for a field with this decorator
- `PagesViewModel`: the class that enables querying for all pages
- `PageViewModel.ts`: the class that contains logic requirements needed for the view (the frontend application)
  - getter functions determine what fields will be included in the schema.
- `PagesEndpoint.ts`: the class that creates a custom Content Delivery Endpoint. It implements `Singleton` to specify that there is only one instance of this endpoint. It has the following configurations:
  - `getPreviewTypes`: specify Preview Types and the url the Preview Types will use
  - `getPaths`: specify the path(s) to send HTTP requests to (this path is added to `app/.env`)
  - `getQueryEntryFields`: use the View Model class to determine the schema for the custom endpoint
  - `updateCorsConfiguration`: permit cross-origin resource sharing (CORS) to enable requests from localhost
  - `getAccessOption`: implicit access so an API key is not required

## Try it yourself

The following are suggestions for diving deeper into the Preview functionality:

1. Update the front-end styling while you also have the Brightspot Preview Panel for that page open. Watch the Preview Panel update real-time!

2. Click on box with a diagonal arrow icon right above the Preview Panel to open the Preview in a separate tab. Make front-end changes and see the changes appear in the tab you opened from Brightspot.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
