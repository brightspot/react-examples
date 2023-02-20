# Headless Preview

Although almost all traditional CMSs provide a preview mode to see how content looks on a web page before publishing, that is not true with headless CMSs. 

This can be a downside to a headless CMS platform, since content creators may find content creation frustrating without the ability to see how content is displayed on a web page as they create or edit.

Brightspot however provides the ability to [preview](https://www.brightspot.com/documentation/brightspot-cms-user-guide/latest/preview) content before publishing with ALL platforms, headless included. With very little additional configuration, headless platform content creators can see their changes on a web page as they create or edit content.

This example focuses using JS Classes to configure and use the Brightspot preview mode with a headless configuration. 
## Running the example application
Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `headless-preview` directory:

To upload JS Classes in Brightspot (http://localhost/cms) run the following commands:

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src
```

To run the front end, run the following commands from the `headless-preview/app` directory:

```sh
yarn
yarn start
```

The front-end application opens automatically in the browser.

## Using the example application
Make sure the front-end application is up and running so you can see how the preview pane in Brightspot updates real time.

Publish a **Course** content item in Brightspot. Make sure to enter a title and slug; the rest of the fields are optional. The content updates in the preview pane as you edit text.

> **_Note_** If you do not see the preview pane, click on the eye icon to the left of the **PUBLISH** button. 

## How everything works
With a headless platform, you are not using a templating system Brightspot provides with its traditional architecture. Instead, you provide your front-end application to connect to the Brightspot platform. 

To view changes to content before publishing with a headless platform, provide Brightspot with a URL that will load in an iframe in the preview pane. Brightspot will load the URL while adding additional parameters to the request (`previewId` and `typename`), which are used to fetch preview content with GraphQL. The GraphQL query will return the data that corresponds to edited content. These editing changes are available in real-time. 

#### JS Classes Files:
Navigate to `brightspot/src/examples/headless_preview`. This directory contains the JS Classes files that are uploaded to Brightspot. The following are key points to note:

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
  'brightspot.examples.headless_preview.CourseModuleView'
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

- `CourseViewModel.ts`: This view model implements `PreviewEntryView` so the preview panel appears when creating **Course** content. If you create a custom marker interfaces and set that interface as an Entry View Class, you can implement that interface instead.

#### Front End
Brightspot adds a `previewId` and `typename` value to the preview iframe when viewing in Brightspot. You can access the `previewId` and `typename` when the web page is opened in Brightspot (in the preview pane). In this example, the front-end application checks if a `previewId` and `previewType` (the `typename` value) exists (see `app/src/index.tsx`) by checking the `window.location`. These parameters exist ONLY when viewing in Brightspot. You can access those arguments using `UrlSearchParams`:

```javascript
const previewId = new URLSearchParams(window.location.search).get('previewId')

const previewType = new URLSearchParams(window.location.search).get('typename')

```

 - `app/src/index.tsx` : The front-end application checks if `previewId` and `typename` exist when determining whether to route to the `BrightspotPreview` or `NotFound` component.

 - `app/src/components/BrightspotPreview.tsx`: If you view the web page in Brightspot, the path routes through the `BrightspotPreview` component and then displays the `Course` component. Otherwise, you are routed through the `CourseContainer` component to view the `Course` component. The query variable differs based on the path. For `BrightspotPreview`, the application uses the `previewId` argument, while `CourseContainer` uses the `slug` argument, thus ensuring that the `PreviewBanner` component only renders when viewing the web page in Brightspot.

## Try it yourself
The following are suggestions for diving deeper into Brightspot's preview functionality:

1. Make a change in your **Course** content item in Brightspot, but do not click the **Publish** button. Then, click on the **Debug Tool** link that displays when viewing the web page in Brightspot (at the bottom of the yellow preview banner). This will route you to information on the **Course** query result in Brightspot's GraphiQL Explorer based on the `previewId` provided. Run the query by pressing the Play Button. Notice the query result shows the changes made in Brightspot that have not yet been published. 

Unselect the `id` argument on the left panel (nested in `preview`). Now, select the `slug` argument nested in `model`. Add the slug value. Run the query, and notice the original published values for the **Content** item are returned.

2. Play around with other preview functionality that Brightspot provides, such as [setting an expiration](https://www.brightspot.com/documentation/brightspot-cms-user-guide/working-with-shared-previews) on a shared preview link. Verify all preview functionality exists for a headless platform. 

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
