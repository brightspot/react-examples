# Static Site Generation with Webhooks

Static web pages are faster and lighter than dynamic sites, resulting in better performance and load times. They are typically used for content that rarely changes because updating static pages requires lengthy rebuilds of the entire site. However, newer front-end frameworks allow for on-demand updates to individual pages, providing fast and up-to-date pages without the limitation of frequent site rebuilds.

This example demonstrates how to leverage Brightspot's [Notifications](https://www.brightspot.com/documentation/brightspot-cms-user-guide/latest/notifications) feature to trigger web page regeneration when content is published or updated.

## What you will learn

1. [Create an endpoint to manage webhooks](#1-create-and-endpoint-to-manage-webhooks)
2. [Define a webhook payload](#2-define-a-webhook-payload)
3. [Configure a webhook notification trigger](#3-configure-a-webhook-notification-trigger)
4. [Define a Next.js webhook handler](#4-define-a-nextjs-webhook-handler)
5. [Add a webhook to the endpoint](#5-add-a-webhook-to-the-endpoint)
6. [Create static Next.js pages](#6-create-static-nextjs-pages)
7. [Handle referenced content](#7-handle-referenced-content)

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

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

### 1. Create an endpoint to manage webhooks

To trigger page regeneration, a front-end application relies on receiving a webhook notification. Brightspot provides the `REST Management API` to manage webhooks.

A REST Management API endpoint can be created by extending the `AbstractRestManagementApi` abstract class. The class has two required methods, `getName()` which serves as an identifier and `getPath()` which defines the URL path used to access the endpoint.

> **_Note_** A REST Management API endpoint requires an API Client to be manipulated from outside of Brightspot. See the [Client Authentication](https://github.com/brightspot/react-examples/tree/main/client-authentication) example for more details.

### 2. Define a webhook payload

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

### 3. Configure a webhook notification trigger

[comment]: <> (The webhook notification should trigger when a CMS editor creates new content or updates existing content. This will let the front-end app know exactly when content changed. The)

[comment]: <> (The webhook payload will let the front-end app know what content changed, but the app also needs to know when that content changed. The webhook notification should trigger when a CMS editor creates new content or updates existing content so that the front-end app always has the most up-to-date data.)

[comment]: <> (The webhook payload is modeled to let the front-end app know what content changed, but the app needs that information the moment that content is changed so it can stay up-to-date. The webhook notification needs to send the payload)

To keep the front-end app up-to-date at all times, it should receive a webhook notification every time content is created or updated. One way to capture these moments is with a global [Modification](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/modifications). A global modification is one that modifies `JavaObject`, thus applying to all classes.

```ts
export default class ExampleTrigger extends JavaClass(
  'brightspot.example.ssg_with_webhooks.ExampleTrigger',
  Modification.Of(JavaObject)
) {}
```

Since the webhook notification needs to trigger after content is created or changed, the action can be captured by overriding the `afterSave()` method.

> **_Note_** It is important to narrow the scope of when this code runs to since it applies to all objects.

```ts
const contentTypes = [
  Article.getClass(),
  Section.getClass()
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
}
```

```ts
afterSave(): void {
  // ... return early checks

  let SsgPayload = ClassFinder.getClass(
    'brightspot.example.ssg_with_webhooks.SsgPayload'
  )
  let payload = new SsgPayload()

  payload.exampleField = 'example'

  Notification.publish(SsgTopic.getClass() as Class<Topic<any>>, payload)
  }
```

### 4. Define a Next.js webhook handler

> **_Note_** TODO

### 5. Add a webhook to the endpoint

> **_Note_** TODO

### 6. Create static Next.js pages

> **_Note_** TODO

### 7. Handle referenced content

> **_Note_** TODO

## Try it yourself

> **_Note_** TODO

## Troubleshooting

Refer to the [Common Issues](/README.md) section in the repository README for assistance.
