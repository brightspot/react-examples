# Headless Preview
This example highlights demonstrates using JS Classes to programatically enable a front-end page preview using Brightspot.

Brightspot’s preview tools allow you to view your content before publishing. With the preview view, you can fine-tune the presentation of your content as you create and edit it. Seeing edits in real time improves the content creation experience significantly.

Brightspot provides the ability to preview content before publishing for all configurations (headless, traditional, hybrid, etc).This example will focus on using the preview system with a headless configuration. Check out the preview documentation to learn more about how Brightspot preview works. `https://www.brightspot.com/documentation/brightspot-cms-user-guide/latest/preview`

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
Make sure you have your front-end application running so you can see how the preview panel in Brightspot updates real time.

Publish a **Course** content item in Brightspot. Make sure to enter a title and slug; the rest of the fields are optional. You can see your content updating in the preview as you are inputting text.

> **_Note_** If you do not see the preview panel, click on the eye icon to the left of the **PUBLISH** button. 

## How everything works
With a headless platform, you are not using a templating system Brightspot provides with its traditional architecture. Instead, you provide your front-end application to connect to the Brightspot platform. 

You can still view changes to your content before publishing, however, using a headless platform. All you need to do is provide Brightspot with a URL that will load in an iframe in the preview window. Brightspot will load the URL while adding additional necessary parameters to the request (`previewId` and `previewType`), which you can use to fetch preview content with GraphQL. The GraphQL query will return the data that corresponds to edited content. These editing changes are available in real-time. 

Navigate to `brightspot/src/examples/headless_preview`. This directory contains the JS Classes files that are uploaded to Brightspot. The following are key points to note:

#### JS Classes Files:
- `Course.ts`: the class that contains the business logic (fields, etc.)
  - `PreviewTypeSupplier`: Implementing this interface makes it possible to specify an instance of a PreviewType class you want to use. 
  - `getPreviewTypes`: Use this method to provide instances of preview types for the given Preview object. This method returns a list of PreviewTypes that are used for the given Preview object. This example creates a new instance of `ContentDeliveryPreviewType` so you can set your preview URL and EntryViewClass. 
  - `ContentDeliveryPreviewType`: Use this class to set the preview URL and EntryViewClass. Select a preview URL that is unique only for preview use (in this example`http://localhost:3000/courses/brightspot-preview`) .

This example uses `PreviewEntryView` for the EntryViewClass. You can also create your custom marker interface if you want to query for all content items associated with that interface via your GraphQL endpoint. Then, you can add your custom interface in the `getQueryEntryFields` method (`HeadlessPreviewEndpoint.ts`) to query for items with `path` or` id` arguments when you are not sure what type of content the input argument corresponds to. An example using a marker interface is [AppRouting](https://github.com/brightspot/react-examples/tree/feature/app-routing-v3).

- `CourseViewModel.ts`: This view model implements `PreviewEntryView` so the preview panel appears when creating **Course** content. If you make your custom marker interfaces and set that interface as an EntryViewClass, you can implement that interface instead.

#### Front End
Brightspot adds a `previewId` and `previewType` value to the preview iframe when viewing in Brightspot. You can access the `previewId` and `previewType` when the website page is opened in Brightspot (in the preview panel). In this example, the front-end application checks if a `previewId` and `previewType` exists (see `app/src/index.tsx`) by checking the `window.location`. Those parameters exist when viewing in Brightspot. You can access those arguments using `UrlSearchParams`:

```javascript
const previewId = new URLSearchParams(window.location.search).get('previewId')

const previewType = new URLSearchParams(window.location.search).get('typename')

```

 - `app/src/index.tsx` : Notice the front-end application checks for the existence of these two arguments in determining whether to route to the `BrightspotPreview` or `NotFound` component. This check is in place because the preview view should only be visible in the context of viewing in Brightspot.

 - `app/src/components/BrightspotPreview.tsx`: If you view the web page in Brightspot, the path routes through the `BrightspotPreview` component and then displays the `Course` component. Otherwise, you are routed through the `CourseContainer` component to view the `Course` component. Note how the query variable differs based on the path. For `BrightspotPreview`, the application uses the `previewId` argument. However, the `CourseContainer` uses the `slug` argument. Routing through various components ensures that the `PreviewBanner` component only renders when viewing the web page in Brightspot.

## Try it yourself
The following are suggestions for diving deeper into Brightspot's preview functionality:

1. Make a change in your **Course** content item in Brightspot, but do not click the **Publish** button. Then, click on the **Debug Tool** link that displays when viewing the web page in Brightspot (at the bottom of the yellow preview banner). This will route you to information on the **Course** query result in Brightspot's GraphiQL Explorer based on the `previewId` provided. Run the query by pressing the Play Button. Notice the query result shows the changes you made in Brightspot but have not yet published. 

Unselect the `id` argument on the left panel (nested in `preview`). Now, select the `slug` argument nested in `model`. Add your slug value. Run the query, and notice the original values for the **Content** item (not the changes you just made but didn't publish) are returned.

2. Change the device size in preview by selecting a different screen size from the dropdown menu above the preview panel. Start typing in a field to change the **Course** information. Notice how the device width updates.

3. Extra Credit 💪: implement the preview view in the [AppRouting](https://github.com/brightspot/react-examples/tree/feature/app-routing-v3) example. What do you need to do to enable previewing an **Article** and **Section**? 

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.
