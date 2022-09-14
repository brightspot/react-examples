# Headless Preview

This example highlights demonstates using JS Classes to programatically enable a front-end page preview using Brightspot.

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `headless-preview` directory:

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

Create a page in Brightspot. Make sure to enter a title; the rest of the fields are optional. You can see your content updating in the preview as you are inputting content.

## How everything works

Brightspot gives you the power to customize Brightspot, add new classes, create endpoints, and much more with JS Classes. One helpful feature Brightspot provides is a Preview Panel when you are creating content.

Navigate to `brightspot/src/examples/headless_preview`. This directory contains the JS Classes files that are uploaded to Brightspot.

#### JS Classes Files:

- `Course.ts`: the class that contains the business logic (fields, etc)
  - `@Indexed({ unique: true })`: This decorator makes it possible to query for data using the specified field
  - `@Note`: Add information for a field with this decorator
  - `getPreviewTypes`: create a new instance of a `ContentDeliveryPreviewType` and set the url to either a url set in the HeadlessPreviewEndpoint or to the default of `http://localhost:3000/courses/brightspot-preview`
- `CoursesViewModel`: the class that enables querying for all courses
- `CourseViewModel.ts`: the class that contains logic requirements needed for the view (the frontend application)
  - getter functions determine what fields will be included in the schema.
- `HeadlessPreviewEndpoint.ts`: the class that creates a custom Content Delivery Endpoint. It implements `Singleton` to specify that there is only one instance of this endpoint. It has the following configurations:
  - `getPaths`: specify the path(s) to send HTTP requests to (this path is added to `app/.env`)
  - `getQueryEntryFields`: use the View Model class to determine the schema for the custom endpoint
  - `updateCorsConfiguration`: permit cross-origin resource sharing (CORS) to enable requests from localhost
  - `getAccessOption`: implicit access so an API key is not required

The key in this example to seeing the preview update while editing content in Brightspot is to use the previewId that Brightspot assigns to content. By adding a check for the previewId in the front-end application, you can either use the route or the previewId to display content. In this example, `http://localhost:3000/courses/brightspot-preview` is used in the `Course.ts` file (JS Class), but you can add any name after `http://localhost:3000/courses` to see each course page in the Brightspot preview panel. Brightspot will use the `previewId` instead of the `title`. Navigate to `app/src/index.ts` to review the routing, and to `app/src/components/Course/index.ts` to see how the `previewId` is used.

You will also notice that the `previewType` and `previewWidth` values appear in preview mode. These values are helpful in identifying the View Model and/or endpoint that the `previewId` corresponds to. The `previewWidth` show the screen width set in the Brightspot preview panel.

## Try it yourself

The following are suggestions for diving deeper into the Preview functionality:

1. Update page content in Brightspot and verify it updates in the Preview panel before publishing.

2. Click on the `Debug Tool` link that displays in preview mode (at the bottom of the yello preview banner). Enter the previewId into the input field to query for ID or predicate to view details about the content associated with the previewId.

## Troubleshooting

Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
