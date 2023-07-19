# Headless Preview

When creating content with Brightspot, content creators should be able to see content changes real time.

Brightspot makes this possible with it's [Preview System](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/preview-system).

This example demonstrates how to configure and use the Brightspot Preview System with a front end using React and GraphQL. 

## What you will learn
1. Create content that can be viewed in Brightspot's Preview Pane.
2. Use an Entry View Interface to access all associated preview content.
3. Access Preview System data in a front-end application.

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

Run the following commands from the `theming/app` directory:

### Install dependencies

```sh
$ yarn
```

```
[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...
[4/4] 🔨 Building fresh packages...
✨ Done in 6.03s.
```

### Start the React app

```sh
$ yarn start
```

```
Compiled successfully!
```

The React app opens automatically in the browser.

## Using the example application
Verify the front-end application is up and running so you can see how the preview pane in Brightspot updates in real time.

Publish a **Course** content item in Brightspot. The content updates in the preview pane as you edit text.

> **_Note_** If you do not see the preview pane, click on the eye icon to the left of the **PUBLISH** button. 

## How everything works

With a headless platform, you are not using a templating system Brightspot provides with its traditional architecture. Instead, you provide your front-end application to connect to the Brightspot platform. 

To view changes to content before publishing with a headless platform, you need to provide Brightspot with the URL where the front-end application is running. That URL will load in an iframe in Brightspot's preview pane, and Brightspot will send `previewId` and `typename` to the URL via HTTP parameters on a request. The `previewId` is used as a query argument to fetch preview content with GraphQL. The GraphQL query will return the data that corresponds to edited content. These editing changes are available in real time. 

#### Back End:
Navigate to `brightspot/src/examples/headless_preview`. This directory contains the JS Class files that are uploaded to Brightspot. The following are key points to note:

- `Course.ts`: The class that contains the business logic (fields, etc.)
  - `PreviewTypeSupplier`: Implement this interface to specify a particular PreviewType class. 
  - `getPreviewTypes`: Use this method to provide instances of preview types for the given Preview object. This method returns a list of PreviewTypes that are used for the given Preview object. This example creates a new instance of `ContentDeliveryPreviewType` in order to set the preview URL and Entry View Class. 
  - `ContentDeliveryPreviewType`: Use this class to set the preview URL and Entry View Class. Select a preview URL that is for preview use only (in this example`<base-url>/courses/brightspot-preview`).

This example uses `PreviewEntryView` for the Entry View Class. You can also create a custom marker interface to query for all content items associated with that interface via a GraphQL endpoint. You can add your custom interface in the `getQueryEntryFields` method (`HeadlessPreviewEndpoint.ts`) to query for items with `path` or` id` arguments when you are not sure what type of content the input argument corresponds to.

ex:

`MyCustomView.ts`
```js
import JavaInterface from 'brightspot-types/JavaInterface'

export default abstract class MyCustomView extends JavaInterface(
  'brightspot.examples.headless_preview.MyCustomView'
) {}

```

`HeadlessPreviewEndpoint.ts`

```js
  [`getQueryEntryFields()`](): List<ContentDeliveryEntryPointField> {
    return [
      CourseViewModel.getClass(),
      CoursesViewModel.getClass(),
      MyCustomView.class,
      HeadlessPreviewEndpointViewModel.getClass(),
    ].map(
      (c) => new ContentDeliveryEntryPointField(c)
    ) as unknown as List<ContentDeliveryEntryPointField>
  }
```

- `CourseViewModel.ts`: This view model implements `PreviewEntryView` so the preview panel appears when creating **Course** content. If you create a custom marker interface and set that interface as an Entry View Class, you can implement that interface instead.

#### Front End
Brightspot adds a `previewId` and `typename` value to the preview iframe when viewing in Brightspot. You can access the `previewId` and `typename` when the web page is opened in Brightspot's preview pane. In this example, the front-end application checks if a `previewId` and `previewType` (the `typename` value) exists (see `app/src/index.tsx`) by checking `window.location`. Those parameters exist ONLY when viewing in Brightspot. You can access those arguments using `UrlSearchParams`:

```javascript
const previewId = new URLSearchParams(window.location.search).get('previewId')

const previewType = new URLSearchParams(window.location.search).get('typename')

```

 - `app/src/index.tsx` : The front-end application checks if `previewId` and `typename` exist when determining whether to route to the `BrightspotPreview` or `NotFound` component.

 - `app/src/components/BrightspotPreview.tsx`: If you view the web page in Brightspot, the path routes through the `BrightspotPreview` component and then displays the `Course` component. Otherwise, you are routed through the `CourseContainer` component to view the `Course` component. The query variable differs based on the path. For `BrightspotPreview`, the application uses the `previewId` argument, while `CourseContainer` uses the `slug` argument, thus ensuring that the `PreviewBanner` component only renders when viewing the web page in Brightspot.

## Try it yourself
The following are suggestions for diving deeper into Brightspot's preview functionality:

- Compare preview content to published content:
    1. Make a change in your **Course** content item in Brightspot, but do not click the **Publish** button.  
    2. Click on the **Debug Tool** link that displays when viewing the web page in Brightspot (at the bottom of the yellow preview banner). This will route you to information on the **Course** query result in Brightspot's GraphiQL Explorer based on the `previewId` provided. 
    3. Run the query by pressing the Play Button. Notice the query result shows the changes made in Brightspot that have not yet been published. 
    4. Unselect the `id` argument on the left panel (nested in `preview`). Now, select the `slug` argument nested in `model`. Add the slug value. 
    5. Run the query, and notice the original published values for the **Content** item are returned.

- Try out other preview functionality that Brightspot provides, such as [setting an expiration](https://www.brightspot.com/documentation/brightspot-cms-user-guide/working-with-shared-previews) on a shared preview link. Verify all preview functionality exists for a headless platform. 

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the repository README for assistance.
