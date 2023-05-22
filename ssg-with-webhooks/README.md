# Static Site Generation with Webhooks

Static web pages are faster and lighter than dynamic sites, resulting in better performance and load times. They are typically used for content that rarely changes because updating static pages requires lengthy rebuilds of the entire site. However, newer front-end frameworks allow for on-demand updates to individual pages, providing fast and up-to-date pages without the limitation of frequent site rebuilds.

This example demonstrates how to leverage Brightspot's Webhooks feature to trigger web page regeneration when content is published or updated.

## What you will learn

1. [Create a webhook payload](#1-define-a-webhook-payload)
2. [Create a webhook notification trigger](#2-configure-a-webhook-notification-trigger)
3. [Refine the notification trigger](#3-refine-the-notification-trigger)
4. [Create a Next.js webhook handler](#4-create-a-nextjs-webhook-handler)
5. [Create an endpoint to manage webhooks](#5-create-an-endpoint-to-manage-webhooks)
6. [Add a webhook to the endpoint](#6-add-a-webhook-to-the-endpoint)
7. [Create static Next.js pages](#7-create-static-nextjs-pages)
8. [Handle referenced content](#8-handle-referenced-content)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

### Create a REST Management API

In Brightspot, navigate to **☰** &rarr; **Admin** &rarr; **APIs** &rarr; **Create** &rarr; **REST Management API** &rarr; **New**, enter a name, and click **Save**.

```
✅ Saved
```

### Create an API Client

In Brightspot, navigate to **☰** &rarr; **Admin** &rarr; **APIs** &rarr; **Clients** &rarr; **New API Client** and add a name, add your newly created REST Management API to the `Endpoints` field, and add an API Key. Then copy the Client ID and API Key into the matching variables in the `app/.env` file. Finally, click **Save**

```
✅ Saved
```

> **_Note_** See {TODO: add link here} for detailed instructions on creating an API Client and API Keys.

Run the following commands from the `ssg-with-webhooks/app` directory:

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

### Generate types

```sh
$ yarn codegen
```

```
✔ Parse Configuration
❯ Generate outputs
  ❯ Generate ./src/generated.ts
✔ Parse Configuration
✔ Generate outputs
✨ Done in 2.05s.
```

### Create a webhook

```sh
$ yarn webhook
```

```
{
  status: 'ok',
  result: {
    url: 'http://host.docker.internal:3000/api/revalidate',
    topic: {
      _type: '4e62e084-d74f-3c1c-a35c-458c92f3886c',
      _id: '00000188-0ad5-d0c9-affd-aaf73b8f0000'
    },
    _id: '00000188-0ad5-d0c9-affd-aaf73b860000',
    _type: '46915378-efd2-3fc0-a308-5c03ca4d8fd6'
  }
}
✨  Done in 0.46s.
```

### Generate production build

```sh
$ yarn build
```

```
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
✨  Done in 3.97s.
```

### Start the Next.js app production server

```sh
$ yarn start
```

```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

## Using the example application

The Next.js app is a simple news site with content consisting of **Sections** and **Articles**. They are set up to automatically generate permalinks as shown in the [Brightspot Routing](https://github.com/brightspot/react-examples/tree/main/brightspot-routing) example.

Publish one or more **Sections** and/or **Articles** in Brightspot and then navigate through the React app to find the published content. When viewing a specific section or article, note that the React app URL path matches the permalink in Brightspot. The React app is using the URL path to query for the matching content in Brightspot.

Publish one or more **Sections** and/or **Articles** in Brightspot. After a few seconds, refresh the web page and navigate through the Next.js app to find the published content. Note that the content appears on the app without having to rebuild.

## How everything works

### 1. Define a webhook payload

In this context, a webhook payload is the data structure that is sent from Brightspot to the front-end app. The app needs to know which pages to regenerate, so the payload should include a list of unique identifiers for those pages.

A webhook payload can be created by extending the `JavaRecord` class and adding fields that represent the desired data structure.

This example uses a data structure that mirrors the [Brightspot Routing](https://github.com/brightspot/react-examples/tree/main/brightspot-routing) example. The payload includes a `paths` field to store the URL paths (and associated metadata) of new or updated content.

[SsgPayload.ts](./brightspot/src/brightspot/example/ssg_with_webhooks/SsgPayload.ts)

```ts
export default class SsgPayload extends JavaClass(
  'brightspot.example.ssg_with_webhooks.SsgPayload',
  JavaRecord
) {
  @JavaField(List.Of(JavaObject))
  paths?: List<JavaObject>
}
```

Next, the payload must be made part of a webhook topic. The webhook topic ultimately allows delivery of the compatible payload and is created with a class that extends the `AbstractTopic<P>` abstract class where `P` is the payload class.

### 2. Configure a webhook notification trigger

To keep the front-end app up-to-date at all times, it should receive a webhook notification every time content is created or updated. One way to capture these moments is with a global [Modification](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/modifications). A global modification is one that modifies `JavaObject`, thus applying to all classes.

```ts
export default class ExampleTrigger extends JavaClass(
  'brightspot.example.ssg_with_webhooks.ExampleTrigger',
  Modification.Of(JavaObject)
) {
  // Trigger implementation
}
```

Since the webhook notification needs to trigger after content is created or changed, the action can be captured by overriding the `afterSave()` method.

> **_Note_** It is important to narrow the scope of when this code runs since it applies to all objects. Checks are included to return early if the saved object is not one that needs a webhook notification sent.

```ts
const contentTypes = [
  ExampleContentType1.getClass(),
  ExampleContentType2.getClass()
]

afterSave(): void {
  super.afterSave()

  // Return early if the original object is null
  if (this.getState().getOriginalObjectOrNull() === null) {
    return
  }

  let original = this.getOriginalObject()

  // Return early if the original object doesn't match any of the listed content types
  if (contentTypes.every((type) => !type.isInstance(original))) {
    return
  }

  // ... build payload

  // ... send notification with payload
}
```

The next step is to fill the webhook payload with the information that the front-end app needs in order to refresh the relevant pages. This app uses content URL paths as unique identifiers, so the paths and associated metadata are broken down and added to the payload.

```ts
afterSave(): void {
  // ... return early checks

  let SsgPayload = ClassFinder.getClass(
    'brightspot.example.ssg_with_webhooks.SsgPayload'
  )
  let payload = new SsgPayload()

  let paths: List<Path> = this.as(DirectoryObjectModification.class).getPaths()

  payload.paths = new ArrayList()

  for (const path of paths) {
    payload.paths.add({
      path: path.getPath() || null,
      site: path.getSite() ? path.getSite().getName() : null,
      type: path.getType().toString() || null,
    })
  }

  // ... send notification with payload
}
```

Then, after the payload is built, it can be sent as a webhook notification with the `Notification.publish()` static method.

```ts
afterSave(): void {
  // ... return early checks

  // ... build payload

  Notification.publish(SsgTopic.getClass() as Class<Topic<any>>, payload)
}
```

### 3. Refine the notification trigger

The webhook trigger implementation in step 2 builds a payload that only includes the updated object's paths. This is fine if content editors never modify existing URL paths. However, if an existing URL path is deleted or modified, the current trigger implementation will not include that information in the payload, causing dead links in the front-end app.

This example includes additional functionality that adds the old URL paths to the payload as well.

The `oldObject` field is added to the trigger to store the values of the object before it is saved.

```ts
@JavaField(JavaRecord)
oldObject?: JavaRecord
```

The `beforeCommit()` method is used to capture the values before they are saved. It includes the same "return early" checks used in the `afterSave()` method to limit unnecessary queries.

```ts
beforeCommit(): void {
  super.beforeCommit()

  let original = this.getState().getOriginalObjectOrNull()

  if (
    this.getState().getOriginalObjectOrNull() === null ||
    this.getState().isNew()
  ) {
    return
  }

  if (contentTypes.every((type) => !type.isInstance(original))) {
    return
  }

  this.oldObject = Query.fromAll()
    .where('_id = ?', this)
    .noCache()
    .first() as JavaRecord
}
```

Now, with access to the URL paths of the old object, both the new and old URL paths are added to the payload.

```ts
afterSave(): void {
  // ... return early checks

  let SsgPayload = ClassFinder.getClass(
      'brightspot.example.ssg_with_webhooks.SsgPayload'
  )
  let payload = new SsgPayload()

  let paths: List<Path> = this.as(DirectoryObjectModification.class).getPaths()
  let oldPaths: List<Path>

  if (this.oldObject !== null) {
    oldPaths = this.oldObject.as(DirectoryObjectModification.class).getPaths()
  } else {
    oldPaths = new ArrayList<Path>() // empty list if there is no old object
  }

  paths.addAll(oldPaths) // combine new and old paths

  payload.paths = new ArrayList()

  for (const path of paths) {
    payload.paths.add({
      path: path.getPath() || null,
      site: path.getSite() ? path.getSite().getName() : null,
      type: path.getType().toString() || null,
    })
  }

  // ... send notification with payload
}
```

### 4. Create a Next.js webhook handler

> **_Note_** TODO

### 5. Create an endpoint to manage webhooks

To trigger page regeneration, a front-end application relies on receiving a webhook notification. Brightspot provides the `REST Management API` to manage webhooks.

A REST Management API endpoint can be created by extending the `AbstractRestManagementApi` abstract class. The class has two required methods, `getName()` which serves as an identifier and `getPath()` which defines the URL path used to access the endpoint.

> **_Note_** A REST Management API endpoint requires an API Client to be manipulated from outside of Brightspot. See the [Client Authentication](https://github.com/brightspot/react-examples/tree/main/client-authentication) example for more details.

### 6. Add a webhook to the endpoint

> **_Note_** TODO

### 7. Create static Next.js pages

> **_Note_** TODO

### 8. Handle referenced content

> **_Note_** TODO

## Try it yourself

> **_Note_** TODO

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
