# Headless Preview
This example highlights demonstrates using JS Classes to programatically enable a front-end page preview using Brightspot.

## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `headless-preview` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src

```

To run the front end:

```sh
cd app
yarn
yarn start
```

The front-end application opens automatically in the browser.

## Using the example application
Make sure you have your front-end application running so you can see how the Preview Panel in Brightspot updates real time.

Publish a **Course** content item in Brightspot. Make sure to enter a title; the rest of the fields are optional. You can see your content updating in the preview as you are inputting text.

> **_Note_** If you do not see the Preview Panel, click on the eye icon to the left of the **PUBLISH** button. 

## How everything works
Brightspot gives you the power to customize Brightspot, add new classes, create endpoints, and much more with JS Classes. One helpful feature Brightspot provides is a Preview Panel when you are creating content.

Navigate to `brightspot/src/examples/headless_preview`. This directory contains the JS Classes files that are uploaded to Brightspot. The following are key points to note:

#### JS Classes Files:
- `Course.ts`: the class that contains the business logic (fields, etc.)
  - `getPreviewTypes`: create a new instance of a `ContentDeliveryPreviewType` and set the url to a url to show the front-end Course page: `http://localhost:3000/courses/brightspot-preview`

#### Front-end
To see the preview update while editing content in Brightspot, you need to access the `previewId` that Brightspot assigns to content. Brightspot also provides the `previewType` and `deviceWidth` in preview mode. By adding a check for the `previewId` and `previewType` in the front-end application, you can query for the Course information using the `previewId`. 

In this example, `http://localhost:3000/courses/brightspot-preview` is used in the `Course.ts` JS Class file. This designated path is specified in the front-end routing in `app/src.index.tsx`. 

There are also two components in `app/src/components`: `BrightspotPreview.tsx` and `AppView.tsx`. 

If you are in preview mode (i.e viewing the page in Brightspot), the path routes through `BrightspotPreview.tsx` and then displays the `Course.tsx` component. If you are not in preview mode, the path routes through `AppView.tsx` and then displays the `Course.tsx` component. Note how the query variable differs based on the path.

These checks for preview mode vs. non-preview mode ensure that only the preview uses the preview path.

## Try it yourself
The following are suggestions for diving deeper into the Preview functionality:

1. Update page content in Brightspot and verify that updates in the Preview Panel before publishing.
2. Click on the `Debug Tool` link that displays in preview mode (at the bottom of the yellow preview banner). This will route you to information on the **Course** content item you are viewing in Brightspot.
3. Change the device size in preview by selecting a different screen size from the dropdown menu above the preview panel. Start typing in a field to change the **Course** information. Notice how the device width updates. 

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
